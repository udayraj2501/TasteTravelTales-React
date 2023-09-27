import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitle">
            <span className='headerTitleSm'> Food & Travel</span>
            <span className='headerTitleLg'>Blog</span>
        </div>

        <img src="https://cdn.pixabay.com/photo/2014/10/22/17/47/keyboard-498396_1280.jpg" alt="" className="headerImg" />
    </div>
  )
}

export default Header