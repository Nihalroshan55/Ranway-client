import React,{useEffect,useState} from "react";
import {
  Card,
  // CardBody,
  CardFooter,
  // Typography,
  // Button,
  CardHeader,
} from "@material-tailwind/react";
import { BsFillBox2Fill } from "react-icons/bs";
// import ChartLine from "./ChartLine";
// import AllOrder from "./AllOrder";
import api from '../axiosInterceptor'
import { BiSolidUser } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import Table from "./Table";




function HubDash() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async()=>{
        
      
        const response=await api.get(`hub/dash/`)
        console.log(response.data,"llllllllllllllllllll");
        setData(response.data)
        
    })()
}, []);
  return (
    <div className="" >
        <div className="my-8 lg:flex justify-evenly gap-2 ">
          <Card className="w-full mt-11 lg:mt-0 ">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <BsFillBox2Fill className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Orders</h1>
                <h1 className=" font-black text-xl float-right">{data?.orders?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.orders?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
          <Card className="w-full mt-11 lg:mt-0 ">
            <div className="flex justify-between ">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4  grid h-16 w-16 justify-center items-center"
              >
                <MdPayment className="h-6 w-6" />
              </CardHeader>
              <div className="m-5">
                <h1 className="text-lg">Revenue</h1>
                <h1 className=" font-black text-xl float-right">{data?.payment?.total}</h1>
              </div>
            </div>
            <CardFooter>
              <hr className="from-gray-50 to-gray-900 " />
              <h1 className="text-lg pt-2">
                <span className="font-black text-green-300">+{data?.payment?.difference}% </span>than
                last month
              </h1>
            </CardFooter>
          </Card>
        </div>
        
<Table/>        
      </div>
  );
}

export default HubDash;