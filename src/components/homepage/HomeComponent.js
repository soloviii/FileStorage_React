import React, { useEffect, useState } from 'react'
import ErrorComponent from '../alert/ErrorComponent'
import FileService from '../../services/file.service'
import { FileBlock } from './FileBlock'

export const HomeComponent = () => {
  const [files, setFiles] = useState([])
  const [result, setResult] = useState('')

  let fileService = new FileService()

  const updateFiles = (removedFile) => {
    let currentFiles = [...files]
    let index = currentFiles.indexOf(removedFile)
    if (index !== -1) {
      currentFiles.splice(index, 1)
    }
    setFiles(currentFiles)
    if (files.length === 0)
      setResult('You do not have any file. Go to upload page!')
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      fileService.getFiles().then((result) => {
        setFiles(result.data)
      })
      if (files.length === 0)
        setResult('You do not have any file. Go to upload page!')
    } catch (err) {}
  }

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-2"> My Files </h2>{' '}
      {files.length !== 0 ? (
        files.map((file) => (
          <FileBlock updateFiles={updateFiles} key={file.id} file={file} />
        ))
      ) : (
        <ErrorComponent text={result} />
      )}{' '}
    </div>
  )
}
