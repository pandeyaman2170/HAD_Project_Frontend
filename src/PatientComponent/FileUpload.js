import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"

const FileUpload = () => {

  const patient = JSON.parse(localStorage.getItem("patientDetails"))
  const patientId = patient.patientId
  const [isRotating, setIsRotating] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePresent, setFilePresent] = useState(false)
  const [fileList, setFileList] = useState([])

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay))
  }

  const fetchAllFile = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    await axios.get(`http://localhost:8090/aws/getAllFilesPatient/${patientId}`)
      .then((response) => {
        console.log("inside fetch files", response.data)
        setFileList(response.data)
        setFilePresent(true)
        console.log("filesss", fileList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClick = async () => {
    setIsRotating(true)
    await fetchAllFile()
    await timeout(1000)
    handleAnimationEnd()
  }

  const handleAnimationEnd = () => {
    setIsRotating(false)
  }

  const handleDelete = async (filename) => {
    console.log("filename",filename)
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    await axios.delete(`http://localhost:8090/aws/deleteFile/${filename}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleFileUpload = async (event) => {
    const files = event.target.files[0];
    console.log("files", files)
    setSelectedFile(event.target.files)
    console.log("file", files)
    const formData = new FormData();
    formData.append("file", files);
    console.log("formData", formData)
    console.log("ptID", patientId)
    try {
    const jwtToken = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
      const response = await axios.post(`http://localhost:8090/aws/uploadFile/${patientId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("file", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="w-full h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center space-y-8 p-4">
          <p className="font-normal text-2xl font-bold text-orange-900">Upload Records</p>
          <label
              className="w-44 flex flex-col items-center px-4 py-4 bg-white text-orange-600 rounded-lg shadow-lg tracking-wide uppercase border border-orange-600 cursor-pointer hover:bg-orange-600 hover:text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span className="font-serif text-lg">Select a file</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        <div className="p-4">
          <div className="flex flex-col border-2 rounded-lg border-orange-300 items-center justify-center">
            <div className='flex flex-row items-center space-x-2 px-2'>
              <h2 className='py-2 text-md font-serif'>Uploaded Records</h2>
              <button onClick={handleClick}>
                <FontAwesomeIcon icon={faArrowsRotate} className={`text-gray-600 ${isRotating ? "animate-spin" : ""}`} />
              </button>
            </div>
            {filePresent ?
                (<div>
                  <ul>
                    {fileList.map((file) => (
                        <div className="flex flex-row p-2">
                          <li key={file.Key}>
                            {file}
                          </li>
                          <li>
                            <button className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => handleDelete(file)}>
                              Delete
                            </button>
                          </li>
                        </div>
                    ))}
                  </ul>
                </div>)
                : (<div className="flex items-center justify-center space-y-4"><p className="text-sm text-zinc-400 font-serif">No records found</p></div>
                )}
          </div>
        </div>
      </div>
  );
}

export default FileUpload;
