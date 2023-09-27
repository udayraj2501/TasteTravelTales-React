import React, { useContext,  useState } from "react";
import "./settings.css";
import Sidebar from "../../sidebar/Sidebar";
import { Context } from "../../../context/Context";
import axios from "axios";

const Settings = () => {
  const {user,dispatch} = useContext(Context);
  const [file ,setFile] = useState(null);
  const [username ,setUsername] = useState("");
  const [email ,setEmail] = useState("");
  const [password ,setPassword] = useState("");
  const [success ,setSuccess] = useState(false);const PF = "http://localhost:5000/images/"



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
  
    try {
      let filename;  // Variable to store the filename
  
      if (file) {
        // Use the original filename for the image
        filename =  file.name;
  
        const data = new FormData();
        data.append("name", filename);
        data.append("file", file);
  
        // Upload the file
        try{
        await axios.post("/upload", data);

        }catch(err){

        }
      }
  
      const updatedUser = {
        userId: user._id,
        username,
        email,
        password,
        profilePic: filename  // Assign the filename to the newPost object
      };
  
      // Create a new post
      try{
      const res = await axios.put("/users/"+ user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload:res.data});
      }catch(err){
        dispatch({type:"UPDATE_FAILURE"});
      }
    } catch (err) {
      console.error("Error uploading file or creating post:", err);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">
            Update Your Account
          </span>
          <span className="settingsDeleteTitle">
            Delete Account
          </span>
        </div>

          <form className="settingsForm" onSubmit  = {handleSubmit}>
            <label> Profile Picutre</label>
            <div className="settingsPP">
              <img
                src= {file ? URL.createObjectURL(file): PF + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-user"></i>
            </label>
            <input type = "file"
            id = "fileInput"
            style={{display:"none"}}
            onChange =  {(e) => setFile(e.target.files[0])} />
            
            </div>

          
            <label> Username</label>
            <input type="text" placeholder={user.username} onChange =  { e => setUsername(e.target.value)}/>

            <label> Email</label>
            <input type="email" placeholder={user.email} onChange =  { e => setEmail(e.target.value)} />

            <label> Password</label>
            <input type="password"
            onChange =  { e => setPassword(e.target.value)} />

            <button className="settingsSubmit" type = "submit">Update</button>

            {success && <span style = {{color: "green", textAlign :"center", marginTop:"20px"}}>Profile has been updated ....</span>}
          </form>
        
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
