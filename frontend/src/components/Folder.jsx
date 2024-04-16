import React, { useState, useEffect } from "react";
import api from "../api";
// External Dependencies

export default function MyFolder() {
  const [folder, setFolder] = useState([]);
  const [folderNameInput, setFolderNameInput] = useState("");
  const [files, setFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");

  let trashFolderId = "";

  let value = "";
  let inTrash = "none";

  let userId = "";
  /// Fetch Notes On load
  useEffect(() => {
    getFiles();
  }, []);

  /// Get Files ///////////////
  const getFiles = () => {
    api
      .get("/files/")
      .then((res) => res.data)
      .then((data) => {
        userId = data[0].user;
        let Data = data;
        setFiles(Data);
        getFolders();
        userId = data[0].user;
      })
      .catch((err) => console.log(err));
  };

  /// Create Folder Api ///////////////
  const createFolder = (e) => {
    userId = files[0].user;
    e.preventDefault();
    api
      .post("/folder/create", {
        user: userId,
        folder_name: folderNameInput,
      })
      .then((res) => res.data)
      .then((data) => {
        getFolders();
        setFolderNameInput("");
      })
      .catch((err) => console.log(err));
  };

  /// Get User Folder ///////////////////
  const getFolders = () => {
    userId = files[0].user;
    api
      .get(`/api/folder/${userId}`)
      .then((res) => res.data)
      .then((data) => {
        const Data = data;
        setFolder(Data);
      })
      .catch((err) => console.log(err));
  };

  /// Delete Folder /////////////////////////////////
  const deleteFolder = (id) => {
    api
      .delete(`/folder/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("Folder deleted!");
        else alert("Failed to delete note.");
        getFiles();
      })
      .catch((error) => console.log(error));
  }
}