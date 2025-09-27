import React, { useState } from 'react'
import './App.css'
import Signin from './components/Signin'
import api from './utils/apiInterceptor'

function App() {
  
  const [file, setFile] = useState<File | undefined>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append("file", file!)

    try {
      const res = await api.post("http://localhost:3000/api/v1/file/uploadPost", formData)

      const data = await res.data
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <Signin />
      <input type="file"
      onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </>
  )
}

export default App
