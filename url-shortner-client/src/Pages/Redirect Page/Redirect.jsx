import React from "react";
import {useParams} from "react-router-dom"


export function Redirect()
{
    const {short}=useParams();

    async function navigateURL()
    {
        try {
            const res=await fetch(`/navigate/${short}`,{
                headers:{"x-access-token":localStorage.getItem("token")}
            })
            const data=await res.json();
            window.location.replace(data.long);

        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(()=>
    {
        navigateURL();
        
    },[])
    return(
        <>
        </>
    )
}

