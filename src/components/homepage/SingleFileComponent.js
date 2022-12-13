import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BiCloudDownload } from 'react-icons/bi'
import FileService from '../../services/file.service'
import { SizeUtility } from '../utils/SizeUtility'
import { useNavigate } from 'react-router-dom'

export const SingleFileComponent = () => {
  let fileService = new FileService()
  const params = useParams()
  const navigate = useNavigate()

  const [file, setFile] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let id = params.id.slice(1)
    try {
      fileService.getFile(id).then((result) => {
        setFile(result.data)
      })
    } catch (err) {}
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    try {
      fileService.downloadFile(file.id).then((result) => {
        const a = document.createElement('a')
        a.setAttribute('style', 'display:none;')
        document.body.appendChild(a)
        a.download = file.name
        a.href = URL.createObjectURL(result.data)
        a.target = '_blank'
        a.click()
        document.body.removeChild(a)
      })
    } catch (err) {}
  }

  return (
    <div className="text-center container mt-2">
      <div className="file"> {'Name: ' + file.name} </div>{' '}
      <div className="file">
        {' '}
        {'Size: ' + SizeUtility.formatBytes(file.size)}{' '}
      </div>{' '}
      <div className="icons">
        <BiCloudDownload cursor="pointer" onClick={handleDownload} size={40} />{' '}
      </div>{' '}
    </div>
  )
}
