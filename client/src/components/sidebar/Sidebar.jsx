import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Sidebar = () => {

  const [cats,setCats] = useState([]);
  const {user,dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  
  useEffect (() =>{
    const getCats = async ()=>{
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
       
        <img className = "sidebarImg"
          src={PF + user.profilePic}
          alt=""
        />
         <span className="sidebarUsername">{user.username}</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eos
          aspernatur iure officiis earum at modi expedita nemo corrupti
          repellendus{" "}
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>

        <ul className="sidebarList">
          {cats.map((c) =>(
           <Link to = {`/?cat=${c.name}`} className="link">
          <li className="sidebarListItem">{c.name}</li>
          </Link>
          ))}
          
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>

        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-instagram"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
