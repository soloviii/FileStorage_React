import React, { Fragment, useState } from 'react'
import Message from '../alert/Message'
import Progress from './Progress'
import axios from 'axios'
import { environment } from '../../environments/environment'
import ErrorComponent from '../alert/ErrorComponent'

const FileUpload = () => {
  const [file, setFile] = useState([])
  const [filename, setFilename] = useState([])
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const [response, setResponse] = useState([])

  const onChange = (e) => {
    let files = e.target.files
    setFile(files)
    let names = []
    for (let index = 0; index < files.length; index++) {
      names[index] = files[index].name
    }
    setFilename(names)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (file.length !== 0) {
      const formData = new FormData()

      for (let index = 0; index < file.length; index++) {
        formData.append('files', file[index])
      }
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        await axios.post(`${environment.apiUrl}/file`, formData, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              ),
            )
            setTimeout(() => setUploadPercentage(0), 2000)
          },
        })

        setMessage('Files uploaded')
        setTimeout(() => setMessage(''), 3000)
        setFile(null)
        setFilename(null)
      } catch (err) {
        if (err.response.status === 500) {
          setResponse(['There was a problem with the server'])
        } else {
          setResponse([err.response])
        }
      }
    }
  }

  return (
    <div className="container mt-4">
      <Fragment>
        {' '}
        {message ? <Message text={message} /> : null}{' '}
        {response
          ? response.map((value, index) => (
              <ErrorComponent key={index} text={value.data} />
            ))
          : null}
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input
              type="file"
              multiple
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />{' '}
            <label className="custom-file-label" htmlFor="customFile">
              {' '}
              {'Choose File'}{' '}
            </label>{' '}
          </div>

          <div className="mb-2">
            {' '}
            {filename
              ? filename.map((name, index) => <div key={index}> {name} </div>)
              : null}{' '}
          </div>

          <Progress percentage={uploadPercentage} />

          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>{' '}
      </Fragment>{' '}
    </div>
  )
}

export default FileUpload
