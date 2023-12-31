import React,{useEffect, useState} from 'react'
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux'
import { open  } from '../../../Redux/LoginReduser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import image from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
function NavbarUser() {
    const [openNav, setOpenNav] = React.useState(false);
    const [auth,setAuth]=useState(true)
    const navigate=useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
      const access=localStorage.getItem('access');
      if (access === null){
        setAuth(false)
      }
    },);

    const handleprofile=()=>{
      const refresh=localStorage.getItem('refresh')
      const access=localStorage.getItem('access')
      const role=localStorage.getItem('role')
    if(role &&  refresh && access){
      navigate("/profile")
    }
    else{
      dispatch(open())
      toast.warning('login for access')
    }
    }
    const handleLogout=()=>{
      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      navigate("/")

    }
    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
            onClick={handleprofile}
          >
            <a  className="flex items-center">
              Profile
            </a>
          </Typography>
        
            {/* <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal"
            >
              <a href="#" className="flex items-center">
                Blocks
              </a>
            </Typography> */}
          {/* {
            auth ?
          <Typography
            as="li"
            variant="small"
            color="white"
            className=" bg-red-800 p-1 font-normal rounded-full"
            onClick={handleLogout}
          >
            <p   className="flex items-center ">
                LOGOUT 
            </p>
          </Typography>: null
          } */}
        </ul>
      );
  return (
    <>
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            
            {/* {image} */}
            {/* <img className='w-20 h-20' src={image} alt="" /> */}
            Runway
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
           {auth ?<Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </Button>:
            <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={()=>dispatch(open())}
            color='white'
          >
            <span>Login</span>
          </Button>} 
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button onClick={handleLogout} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Logout</span>
          </Button>
        </Collapse>
      </Navbar>
    </>
  )
}

export default NavbarUser
