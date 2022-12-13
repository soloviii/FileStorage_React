import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserService from '../../services/user.service'
import LimitService from '../../services/limit.service'
import '../css/SingleUser.css'
import { SizeUtility } from '../utils/SizeUtility.js'
import { Roles } from '../models/roles'
import {
  isCurrentUser,
  isAdminOrSuper,
  isSuperAdmin,
} from '../../services/auth-header'

export const SingleUserComponent = () => {
  let userService = new UserService()
  let limitService = new LimitService()
  const params = useParams()

  const [user, setUser] = useState({})
  const [limits, setLimits] = useState({})
  const [isDisable, setIsDisable] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let id = params.id ? params.id.slice(1) : ''
    let dataId
    try {
      await userService.getUser(id).then((result) => {
        dataId = result.data.id
        console.log(result.data)
        setUser(result.data)
        setIsDisable(result.data.isDisabled)
        setIsAdmin(result.data.role === Roles.Admin)
      })

      await limitService.getByUserId(id).then((result) => {
        console.log(result.data)
        setLimits(result.data)
      })
    } catch (err) {}
  }

  const disable = async (e) => {
    e.preventDefault()

    try {
      userService.disable(user.id).then((result) => {})
      setIsDisable(true)
    } catch (err) {}
  }

  const enable = async (e) => {
    e.preventDefault()

    try {
      userService.enable(user.id).then((result) => {})
      setIsDisable(false)
    } catch (err) {}
  }

  const makeAdmin = async (e) => {
    e.preventDefault()
    try {
      userService.addAdmin(user.id).then((result) => {})
      setIsAdmin(true)
    } catch (err) {}
  }

  const removeAdmin = async (e) => {
    e.preventDefault()
    try {
      userService.removeAdmin(user.id).then((result) => {})
      setIsAdmin(false)
    } catch (err) {}
  }

  return (
    <div class="card mt-4 userblock">
      <h4 class="card-header">User details</h4>
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-3">First name</dt>
          <dd class="col-sm-9">{user.firstName}</dd>

          <dt class="col-sm-3">Last name</dt>
          <dd class="col-sm-9">{user.lastName}</dd>

          <dt class="col-sm-3">Email</dt>
          <dd class="col-sm-9">{user.email}</dd>

          <dt class="col-sm-3">Role</dt>
          <dd class="col-sm-9">{user.role}</dd>

          <dt class="col-sm-3">Number of files</dt>
          <dd class="col-sm-9">{user.numberOfFiles}</dd>

          <dt class="col-sm-3">Total used size</dt>
          <dd class="col-sm-9">
            {SizeUtility.formatBytes(user.sumOfFilesSize)}
          </dd>

          <dt class="col-sm-3">Limits</dt>
          <dd class="col-sm-9">
            <dl class="row">
              <dt class="col-sm-3">Max Files Number</dt>
              <dd class="col-sm-9">{limits.maxFilesNumber ?? 'Unlimited'}</dd>

              <dt class="col-sm-3">Max File Size</dt>
              <dd class="col-sm-9">
                {limits.maxFileSize
                  ? SizeUtility.formatBytes(limits.maxFileSize)
                  : 'Unlimited'}
              </dd>

              <dt class="col-sm-3">Max Storage Size</dt>
              <dd class="col-sm-9">
                {limits.maxStorageSize
                  ? SizeUtility.formatBytes(limits.maxStorageSize)
                  : 'Unlimited'}
              </dd>
            </dl>
          </dd>
          {!isCurrentUser(user.email) && isAdminOrSuper() ? (
            <>
              <dt class="col-sm-3">Actions</dt>
              <dd class="col-sm-9 actions">
                {isDisable ? (
                  <button class="btn btn-primary" onClick={enable}>
                    Enable user
                  </button>
                ) : (
                  <button class="btn btn-info" onClick={disable}>
                    Disable user
                  </button>
                )}
                {isSuperAdmin() ? (
                  <>
                    {!isAdmin ? (
                      <button onClick={makeAdmin} class="btn btn-secondary">
                        Make Administrator
                      </button>
                    ) : (
                      <button onClick={removeAdmin} class="btn btn-secondary">
                        Remove Administrator
                      </button>
                    )}
                  </>
                ) : null}
                <a href={`/limit/:${user.id}`} class="btn btn-warning">
                  Edit limits
                </a>
              </dd>
            </>
          ) : null}
        </dl>
      </div>
    </div>
  )
}
