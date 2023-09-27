import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import {Context} from "../../../context/Context";

const Write = () => {
  const [title ,setTitle] = useState("");
  const [desc ,setDesc] = useState("");
  const [file ,setFile] = useState(null);
  const {user} = useContext(Context)

  // const handleSubmit = async (e) =>{
  //   e.preventDefault();
  //   const newPost = {
  //     username:user.username,
  //     title,
  //     desc,
  //   }
  //   if(file){
  //     const data = new FormData();
  //     const filename = Date.now() + file.name;
  //     data.append("name",filename);
  //     data.append("file",file);
  //     newPost.photo = filename;

  //     try{
  //       await axios.post("/upload",data);

  //     }catch(err){
  //       console.error("Error uploading file:", err);
  //     }
  //   }
  //   try{
  //   const res = await axios.post("/posts",newPost);
  //   window.location.replace("/post/" + res.data._id);
  //   }catch(err){
  //     console.error("Error uploading file:", err);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let filename;  // Variable to store the filename
  
      if (file) {
        // Use the original filename for the image
        filename =  file.name;
  
        const data = new FormData();
        data.append("name", filename);
        data.append("file", file);
  
        // Upload the file
        await axios.post("/upload", data);
      }
  
      const newPost = {
        username: user.username,
        title,
        desc,
        photo: filename  // Assign the filename to the newPost object
      };
  
      // Create a new post
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Error uploading file or creating post:", err);
    }
  };


  return (
    <div className="write">
       {file &&(
        <img src= {URL.createObjectURL(file)} alt="" 
        className="writeImg"/>
        )}
      <form className="writeForm" onSubmit = {handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i class="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange =  {(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange = { e => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value = {desc}
            onChange = { e => setDesc(e.target.value)}
          >

          </textarea>
        </div>

        <button className="writeSubmit" type = "submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;

