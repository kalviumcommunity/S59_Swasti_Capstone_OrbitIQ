import React ,{useState,useEffect} from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie";


function jwtdecode() {
    const [userData,setUserData]=useState([])
    useEffect(()=>{
        const token = Cookies.get("token")
        const decodedData=jwtDecode(token)
        setUserData(decodedData)
      },[])
  return userData;
}

export default jwtdecode