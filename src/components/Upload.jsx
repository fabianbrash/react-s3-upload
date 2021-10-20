import React, { useState } from 'react'
import { uploadFile } from 'react-s3';

const s3_BUCKET_NAME = 'fb-react-s3';
const REGION = 'us-east-1';
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const config = {
    bucketName: s3_BUCKET_NAME,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState([]);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
        .then(data => {
            setResponse(data);
            console.log(data)
        })
        .catch(err => console.error(err))
    }
    return (
        <div>
            <h2>React S3 File Upload</h2>
            <input type="file" onChange={handleFileInput} />
            <button onClick = {() => handleUpload(selectedFile)}>Upload to S3</button>

        <>
            <img src={response.location} alt={response.key} />
        </>
        </div>
    )
}

export default Upload
