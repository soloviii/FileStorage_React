import React, { useState, useEffect } from 'react'
import ErrorComponent from '../alert/ErrorComponent'
import UserService from '../../services/user.service'
import LimitService from '../../services/limit.service'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/Limits.css'

const LimitsComponent = () => {
  const [user, setUser] = useState({})
  const [limits, setLimits] = useState({})

  const [filesNumber, setfilesNumber] = useState()
  const [maxFileSize, setMaxFileSize] = useState()
  const [maxStorageSize, setMaxStorageSize] = useState()
  const [response, setResponse] = useState([])

  const navigate = useNavigate()
  const params = useParams()
  let userService = new UserService()
  let limitService = new LimitService()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let id = params.id ? params.id.slice(1) : ''
    try {
      await userService.getUser(id).then((result) => {
        setUser(result.data)
      })

      await limitService.getByUserId(id).then((result) => {
        setLimits(result.data)
        setMaxFileSize(result.data.maxFileSize)
        setfilesNumber(result.data.maxFilesNumber)
        setMaxStorageSize(result.data.maxStorageSize)
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (filesNumber && maxFileSize && maxStorageSize) {
        let limit = {
          maxFileSize: maxFileSize,
          maxFilesNumber: filesNumber,
          maxStorageSize: maxStorageSize,
          userId: params.id ? user.id : null,
        }
        await limitService.createOrUpdate(limit)
        let id = params.id ? params.id.slice(1) : ''
        await limitService.getByUserId(id).then((result) => {
          setLimits(result.data)
          setMaxFileSize(result.data.maxFileSize)
          setfilesNumber(result.data.maxFilesNumber)
          setMaxStorageSize(result.data.maxStorageSize)
        })
      } else {
        setResponse([{ description: 'All inputs must have a value!' }])
      }
    } catch (err) {
      if (err.response.status === 500) {
        setResponse(['There was a problem with the server'])
      } else {
        console.log(err.response.data)
      }
    }
  }

  const filesNumberHandler = (e) => {
    e.preventDefault()
    setfilesNumber(e.target.value)
    setResponse([])
  }
  const storageSizeHandler = (e) => {
    e.preventDefault()
    setMaxStorageSize(e.target.value)
    setResponse([])
  }
  const fileSizeHandler = (e) => {
    e.preventDefault()
    setMaxFileSize(e.target.value)
    setResponse([])
  }

  return (
    <div className="container mt-4">
      <h2>
        Limit for{' '}
        {params.id ? `'${user.firstName} ${user.lastName}'` : 'all users'}
      </h2>
      {response
        ? response.map((value, index) => (
            <ErrorComponent key={index} text={value.description} />
          ))
        : null}{' '}
      <form onSubmit={onSubmit} class="Form">
        <div class="form-group">
          <label for="maxFileSize">Max File Size (bytes)</label>
          <input
            type="number"
            name="maxFileSize"
            class="form-control"
            value={maxFileSize}
            onChange={(e) => fileSizeHandler(e)}
          />
        </div>
        <div class="form-group">
          <label for="maxFilesNumber">Max Files Number</label>
          <input
            type="number"
            name="maxFilesNumber"
            class="form-control"
            value={filesNumber}
            onChange={(e) => filesNumberHandler(e)}
          />
        </div>
        <div class="form-group">
          <label for="maxStorageSize">Max Storage Size (bytes)</label>
          <input
            type="number"
            name="maxStorageSize"
            class="form-control"
            value={maxStorageSize}
            onChange={(e) => storageSizeHandler(e)}
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
          <a
            href={params.id ? `/user/:${user.id}` : '/users'}
            class="btn btn-link"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}

export default LimitsComponent
