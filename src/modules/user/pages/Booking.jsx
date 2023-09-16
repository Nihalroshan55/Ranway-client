import React,{useEffect,useState} from 'react'
import Navbar from '../components/NavbarUser'
import '../components/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input,
         Textarea,
         Select, 
         Option,
         Button,
         Typography,
         Dialog,
} from "@material-tailwind/react";
import Verification from '../components/Verification';
import axios from 'axios';
import api from '../useraxiosInterceptor';
import Conformation from '../components/conformation';
import { useSelector, useDispatch } from 'react-redux'
import Login from '../components/Login';
import Register from '../components/register';
import Loader from '../components/Loader';

function Booking() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + 5);
  const currentDateStr = currentDate.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];
  const on=useSelector((state) => state.login.value)
  const [categories, setCategories] = useState([]);
  const [select,setSelect]=useState(0)
  const [is_active,setIs_active]=useState(false)
  const [price,setPrice]=useState(0)
  const[total,setTotal]=useState(0)
  const [auth ,setAuth]=useState(true);
  const [varifications, setVarifications] = useState({});
  const[booking,setBooking]=useState()
  const [loading,isLoading]=useState(false)

  const handleKeyPress = (e) => {
    // Prevent the up and down arrow keys from changing the value
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };
  const handelChange=()=>{
    setAuth(!auth)
} 
  const handleSelect = (event)=>{
    console.log('Event:', event);
    setSelect(event);
  }
  useEffect(() => {
  (async()=>{
      try {
        const response = await  axios.get('http://127.0.0.1:8000/product/categories/');
        if (response && response.status === 200 ) {
            console.log(response.data);
            if (response.data){
              setCategories(response.data);
    
            }
            else{
                
            }
        }
      }catch (error) {
      // Handle any error that occurs during the HTTP request
      console.error('Error:', error);
      // toast.error(error.response.data.message)
      }
    
  })();
  },[]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputObject = Object.fromEntries(formData);
    console.log(select.id);
    const cpd = new Date(inputObject["hbd"]);
    cpd.setDate(currentDate.getDate() + 6);
    inputObject["cpd"]=cpd.toISOString().split('T')[0];
    inputObject["category"]=select.id
    console.log(inputObject,"inputttttttttttttttt");
    if (select ||inputObject.to_address||inputObject.from_address||inputObject.height||inputObject.product_name||inputObject.weight||inputObject.width){
      setPrice(select.price)
      if (inputObject.height>250){
        console.log(price,"firsttttttttttttttttttttttttttttt");
        setTotal(price+30)
        console.log(price,"nextrrrrrrrrrrrrrrrr");
      }
      if (inputObject.weight>80){
        setTotal(price+50)
      }
      if (inputObject.width>40){
        setTotal(price+20)
      }

      try {
      isLoading(true);

        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('product/booking/', inputObject);
    
        console.log(response.data);
      // setIs_active(true) 
      
      setBooking(response.data)
      isLoading(false);


        // alert(`${response.data} Hub has been created successfully`);
        setIs_active(true) 

      } catch (error) {
        console.error(error);
        // Handle error: Display an error message to the user or perform other actions.
      }
      
    }
    // Process and validate form data here
  };
  const handleOpen=(event)=>{
    setIs_active(event)
  }
  return (
    <>

{on 
            && 
        <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none" >
            {auth ? <Register handelChange={handelChange}  /> : <Login handelChange={handelChange} />}
            <ToastContainer/>
        </Dialog>
         }
    <Navbar/>
    <Conformation is_active={is_active}  price={price} booking={booking} handleOpen={handleOpen}/>
    <div className='bg-amber-100 h-fit flex w-full justify-center items-center '>
      <div className='w-4/12 '>
      <Typography variant="h1" className="text-light-green-700  text-center ">Enter Details</Typography>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
          <Input  className='' name='product_name' color="indigo" label="Product Name" />
          </div>
          <div className='mb-2'>

          <Select onChange={handleSelect} className='' name='category' color="indigo" label="Category">
            {categories.map((cat) => (
              <Option key={cat.id} value={cat} >{cat.name}</Option>
              ))}
          </Select>
              </div>
              

          <Textarea name='from_address' color="indigo" label="From address" />
          <div className='mb-2'>
          <Input className="no-spin-button" type='number' name='from_zipcode' color="indigo" label="from address pincode" />

              </div>

              <div className='mb-2'>
          <Input className="no-spin-button" type='number' name='from_user_contact' color="indigo" label="from address contact number" />

              </div>
          <Textarea name='to_address' color="indigo" label="To address" />
          <div className='mb-2'>
          <Input className="no-spin-button" type='number' name='to_zipcode' color="indigo" label="to address picode" />

              </div>
              
              <div className='mb-2'>
          <Input className="no-spin-button" type='number' name='to_user_contact' color="indigo" label="to address contact number" />

              </div>
              <div className='mb-2'>

          <Input  className="no-spin-button" type='number' name='height' color="indigo" label="height" />
              </div>
              <div className='mb-2'>

          <Input className="no-spin-button"   type='number' name='width' color="indigo" label="width" />
              </div>
              <div className='mb-2'>

<Input className="no-spin-button"   type='number' name='weight' color="indigo" label="weight" />
    </div>
              <div className='mb-2'>
                

<Input className="no-spin-button"  type='number' name='product_price' color="indigo" label="price to be collect" />
    </div>
    <div className='mb-2'>
      
              <Input onKeyDown={handleKeyPress} color="indigo" name='hbd' label='date for pickup'   type="date" min={currentDateStr}  max={maxDateStr} />
    </div>
          <Verification setVarifications={setVarifications} varifications={varifications}/>
              
          <div className='flex justify-center'>

          <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>



  </>
  )
  
}

export default Booking