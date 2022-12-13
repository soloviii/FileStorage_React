import React, { useState, useEffect } from 'react'
import { BiCloudDownload } from 'react-icons/bi'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import FileService from '../../services/file.service'
import '../css/FileBlock.css'
import { useNavigate } from 'react-router-dom'

export const FileBlock = ({ file, updateFiles, ...rest }) => {
  let fileService = new FileService()
  const navigate = useNavigate()

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
  const handleRemove = async (e) => {
    e.preventDefault()
    try {
      fileService.removeFile(file.id)
      updateFiles(file)
    } catch (err) {}
  }

  const navigateToFile = async (e) => {
    e.preventDefault()
    navigate(`file/:${file.id}`)
  }

  return (
    <div className="container mt-2">
      <div className="main">
        <div className="file" onClick={navigateToFile}>
          {file.name}
        </div>
        <div className="icons">
          <BiCloudDownload
            cursor="pointer"
            onClick={handleDownload}
            size={40}
          />
          <RiDeleteBin2Fill cursor="pointer" onClick={handleRemove} size={40} />
        </div>
      </div>
    </div>
  )
}
