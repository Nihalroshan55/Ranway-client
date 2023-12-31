import React,{useState,} from 'react'
import image from '../images/loginadmin.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    // Checkbox,
    Button,
  } from "@material-tailwind/react";
  // import jwt_decode from "jwt-decode";
function Login() {
  const navigate =useNavigate();
  const refresh=localStorage.getItem('refresh')
  const access=localStorage.getItem('access')
  const role=localStorage.getItem('role')
if(role && refresh && access){

  navigate('/admin')
  // navigate(-1)
  
}else{
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
    const divStyle = {
        height: "100vh", // 100% of the viewport height
        width: "100vw", // 100% of the viewport width
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // marginTop: "-vh",
        padding: "20vh",
        
    
    
      };
      const overlayStyle = {
        content: "", // Required for the ::before pseudo-element
        position: "absolute", // Position the overlay relative to the parent element
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Set the desired opacity value here
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      const errors = {};

    if (!inputObject.email) {
      return toast.warning('email is required')
    } else if (!isValidEmail(inputObject.email)) {
      return toast.warning('enter a correct email format')
    }

    if (!inputObject.password) {
      return toast.warning('Password is required')
    } 
    // else if (!isValidPassword(inputObject.password)) {
    //   return toast.warning(
    //     'Password must contain at least one uppercase letter, one lowercase letter, and one special character')
    // }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    
        try {
          const response = await axios.post(import.meta.env.VITE_BASE_URL+'auths/login/', inputObject);
          
          // Check if the response is successful
          if (response && response.status === 200) {
            // console.log(response.data);
            localStorage.setItem('refresh', response.data.refresh)
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('role', response.data.access_token_payload.role)
            // localStorage.
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
            // item=jwt_decode(response.data.access)
            console.log(localStorage.getItem('role'));  
            // console.log("itemsssssssssssssssssssssssssssssssssssssss",item);
            toast.success('welcome')
            navigate('/admin')
            // Handle success response and further actions upon successful login here
          } else {
            // Handle other scenarios where the response is not successful
            console.error('Login failed:', response);
            toast.warning(' ')
          }
        } catch (error) {
          // Handle any error that occurs during the HTTP request
          console.error('Error:', error);
          toast.error(error.response.data.message)
        }
      };

      const isValidEmail = (email) => {
        // Simple email format validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      const isValidPassword = (password) => {
        // Password validation using regular expression
        // Requires at least one uppercase letter, one lowercase letter, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };

  return (
    <div style={divStyle} className="overflow-x-hidden" >
<div style={overlayStyle}></div>
   <div className="flex    justify-center items-center " >
   <Card className="w-96 ">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In admin
        </Typography>
      </CardHeader>
        <form className='max-h-screen overflow-y-auto' onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4">
        <Input 
        label="Email" 
        name='email' 
        size="lg" 
        
        />
         
        
        <Input
        label="Password" 
        name='password'
        size="lg"
        type='password'
       
        />
        <input name='role' value='admin' type='hidden'/>
        
        <div className="-ml-2.5">
          {/* <Checkbox label="Remember Me" /> */}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button type='submit' variant="gradient" fullWidth>
          Sign In
        </Button>
      </CardFooter>
            </form>
    </Card>
    </div>
    <ToastContainer/>

    </div>
  )
}
  
}

export default Login