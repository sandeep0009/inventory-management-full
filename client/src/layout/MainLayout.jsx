import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { MdDashboard } from "react-icons/md";
import { FiBox, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { IoIosArrowDroprightCircle, IoMdArrowDropleft } from "react-icons/io";
import { selectSideBarToggle,setToggle } from '../slice/Sidebar.slice';

const MainLayout = ({ children }) => {
  const selector = useSelector(selectSideBarToggle);
  const dispatch = useDispatch();

  return (
    <div className="flex items-start lg:gap-x-2">
      <Sidebar collapsed={selector.collapsed} breakPoint="lg" toggled={selector.sideBarToggle}>
        <Menu>
          <MenuItem className="lg:hidden" onClick={() => dispatch(setToggle())}>
            {selector.sideBarToggle ? <IoIosArrowDroprightCircle className="text-2xl" /> : <IoMdArrowDropleft className="text-2xl" />}
          </MenuItem>

          <MenuItem component={<Link to="/" />} icon={<MdDashboard className="text-2xl" />}> Dashboard </MenuItem>
          <MenuItem component={<Link to="/orders" />} icon={<FiBox className="text-2xl" />}> Orders </MenuItem>
          <MenuItem component={<Link to="/user" />} icon={<FiUser className="text-2xl" />}> Users </MenuItem>
        </Menu>
      </Sidebar>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
