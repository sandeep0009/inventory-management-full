import React from 'react';
import { useDispatch } from 'react-redux';
import { setToggle, collapseSideBar } from '../slice/Sidebar.slice'; 
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarHandler = () => dispatch(collapseSideBar());
  const sidebarHandlerToggle = () => dispatch(setToggle());
  const logoutHandler = () => {
    navigate('/login');
  };

  return (
    <header className="py-4 shadow-md px-10">
      <div className="nav flex items-center justify-between">
        <div className="btn"> 
          <button className='lg:hidden' onClick={sidebarHandlerToggle}>
            <HiOutlineMenuAlt3 className='text-2xl' />
          </button>
          <button className='hidden lg:flex' onClick={sidebarHandler}>
            <HiOutlineMenuAlt3 className='text-2xl' />
          </button>
        </div>
        <div className="end">
          <button title='logout' className='hidden lg:flex' onClick={logoutHandler}>
            <IoLogOutOutline className='text-2xl' />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
