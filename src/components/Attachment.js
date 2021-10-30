import React, { useState, useEffect } from 'react'
import download from 'js-file-download';
import axios from 'axios'
import './SanphamWorkplace.css'
function Admin_workplace() {
    const [attachment, setAttachment] = useState(null)
    const [files,setFiles] = useState([])
    const FileDownload = require('js-file-download');

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'files')
        .then(response => setFiles(response.data) )
        .catch(erro => console.log(erro))
    },[])

    const handleFile = async (e) => {
        setAttachment(e.target.files[0]);
        console.log(attachment)
    }

    const handleUpload = () => {
        console.log("att: " + attachment)
        const fromData = new FormData();
        fromData.append("files", attachment);
        axios({
            method: "post",
            url: process.env.REACT_APP_API +"uploadFiles",
            data: fromData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(response =>{
                console.log(response)
		        window.location.reload();
            }).catch(error => console.log(error))
    }

    const handleDownload =  (f) => {

        window.location.href = process.env.REACT_APP_API +"downloadFile/" + f.id;
    }

    return (
        <div className="workplace" >
           
            <table className="table table-striped table-bordered table-hover">
            <thead className="thead">
                <tr>
                    <th colspan="3" className="form-head">Danh sách các file</th>
                </tr>
                <tr>
                    <th>File name</th>
                    <th>Type</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {files.map(f=>{
            
            //console.log(target)
                return (
                <tr key={f.id}>
                    <td>{f?.docName}</td>
                    <td>{f?.docType}</td>
                    
                    <td className="custom"><p className="custom-link" onClick={()=> handleDownload(f)}>Download</p> </td>
                    
                    
                </tr>
            )
        })}
            </tbody>
        </table>

        <div className="upload-form">
            <ul>
                <label className="filelabel" for="file-input">
                    <i className="fa fa-paperclip"></i>
                    <span className="title">Chọn File</span>
                    <input id="file-input" name="file" type="file" onChange={handleFile}/>
                </label>

                <button className="btn btn-info" type="button" onClick={handleUpload}>Upload file</button>
            </ul>
        </div>
        </div>



        
    )
}
export default Admin_workplace