import { useState, useEffect } from "react";
import api from "../api.js";

export default function File() {
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState([]);


  useEffect(() => {
    getFiles();
  }, []);

  ///Get Files ///
  const getFiles = () => {
    api
      .get("/files/")
      .then((res) => res.data)
      .then((data) => {
        setFiles(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  
  //Upload File ///////////////////////////////
  const UploadFile = (e) => {
    console.log(fileInput[0]);
    const formData = new FormData();
    formData.append("file", fileInput[0]);
    console.log(formData);
    e.preventDefault();
    setTimeout(() => {
      api
        .post("/files/upload", { FormData, user: userName })
        .then((res) => {
          if (res.status === 201) {
            alert("File has been uploaded!");
            getFiles();
          } else {
            alert("Failed to upluad file.");
          }
        })
        .catch((err) => console.log(err));
    }, 2000);
  };

  /// Delete File /////////////////////////////////
  const deleteFile = (id) => {
    api
      .delete(`/api/file/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("File deleted!");
        else alert("Failed to delete note.");
        getFiles();
      })
      .catch((error) => console.log(error));
  };
}
 
 