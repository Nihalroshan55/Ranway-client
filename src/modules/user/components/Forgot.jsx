import React, { useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
  } from "@material-tailwind/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { close } from '../../../Redux/LoginReduser';
import { useSelector, useDispatch } from 'react-redux'
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import Otp from './ForgotOtp';


function Forgot({handleForget}) {
  const navigate=useNavigate()
  const [email,setemail]=useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsSubmitted(true);
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      const errors = {};

    if (!inputObject.email) {
      return toast.warning('email is required')
    } else if (!isValidEmail(inputObject.email)) {
      return toast.warning('enter a correct email format')
    }

    // if (!inputObject.password) {
    //   return toast.warning('Password is required')
    // } 
    // else if (!isValidPassword(inputObject.password)) {
    //   return toast.warning(
    //     'Password must contain at least one uppercase letter, one lowercase letter, and one special character')
    // }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    
        try {
          console.log(inputObject,"dataaaaaaaaaaaaaaaaaa");
          const response = await axios.post(import.meta.env.VITE_BASE_URL+'user/forget/', inputObject);
          
          // Check if the response is successful
          if (response && response.status === 200) {
            // console.log(response.data);
            // localStorage.setItem('refresh', response.data.refresh)
            // localStorage.setItem('access', response.data.access)
            // localStorage.setItem('role', response.data.access_token_payload.role)
            // // localStorage.setItem('user', JSON.stringify(response.data.user))
            // console.log(response.data.user,"kkkkkkkkkkkkkk");
            // // item=jwt_decode(response.data.access)
            // console.log(localStorage.getItem('role'));  
            // console.log("itemsssssssssssssssssssssssssssssssssssssss",item);
            console.log(response.data);
            setdata(response.data)
            setemail(inputObject.email)
            toast.success('Otp sented to your mail')
            setTimeout(()=>{

            //   dispatch(close())
            setconform(true)
            },1500)
            // navigate("/")
            // navigate('/home')
            // Handle success response and further actions upon successful login here
          } else {
            // Handle other scenarios where the response is not successful
            console.error('Login failed:', response);
            toast.warning('Login failed')
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
    const on =useSelector((state) => state.login.value)
    const dispatch = useDispatch()

    const [conform,setconform]=useState(false)
    const[data,setdata]=useState()

    

  return (
     <>
     {conform?
     <Otp data={data} email={email} setdata={setdata} />:

     
     

     <>
     <Card className="mx-auto w-full max-w-[24rem]">

              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
                >
                <Typography variant="h3" color="white">
                  Sign In
                </Typography>
              </CardHeader>
                <form onSubmit={handleSubmit}>
              <CardBody className="flex flex-col gap-4">

                <Input label="Email" size="lg" name='email' />
                {/* <Input label="Password" type='password' name='password' size="lg" />
                <Input label='conform password'  name='conform_password'/> */}
                {/* <div className="-ml-2.5">
                  <Checkbox label="Remember Me" />
                </div> */}
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" 
                // onClick={()=>dispatch(close())}
                type='submit'
                
                fullWidth>
                  Submit
                </Button>
                 <Typography variant="small" className="mt-6 flex justify-center">
                  Don&apos;t have an account?
                  <Typography
                    as="a"
                    variant="small"
                    color="blue"
                    // onClick={handelChange}

                    className="ml-1 font-bold"
                    >
                    Sign up
                  </Typography>
                </Typography>

                <Typography variant="small" className="mt-6 flex justify-center">
                  
                  <Typography
                    as="a"
                    variant="small"
                    color="blue"
                    onClick={handleForget}

                    className="ml-1 font-bold"
                    >
                    Back to login
                  </Typography>
                </Typography>
              </CardFooter>
                </form>
             </Card>
             <XMarkIcon onClick={()=>dispatch(close())} color='white' className=' w-6 h-6 ms-5 '/>
     </>
     }
    </>
  )
}

export default Forgot
 