import React from "react";
import NavbarStyles from "../Navbar/Navbar.module.css";
import {useDispatch, useSelector } from "react-redux";
import  {loginUnsuccess} from "../../Redux/Auth/AuthActions";
import { useNavigate } from "react-router-dom";
import {Button} from "@chakra-ui/react";


export function Navbar()
{
    const {auth}=useSelector((state)=>state);
    const [isAuth,setisAuth]=React.useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    async function handleLogout()
    {       
        try {
            
            await localStorage.removeItem("token");
            
            navigate("/");
        } catch (error) {
            console.log(error);
        }      
            
    }
    React.useEffect(()=>
    {
        const token=localStorage.getItem("token");
        
        
        
        if(token)
        {
            setisAuth(true);
        }
    },[])
    return(
        <div className={NavbarStyles.Container}>
            <img src="data:image/png;base64,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" alt="" />
            <div style={{display:"flex",gap:"15px"}}>
            {isAuth?<> <p></p> <Button  colorScheme="blue" size="lg" onClick={handleLogout}>Logout</Button></>:<></>}
            </div>
            
        </div>
    )
}