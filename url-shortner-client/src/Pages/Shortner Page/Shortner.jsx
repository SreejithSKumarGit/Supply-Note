import React from "react";  
import {Link} from "react-router-dom";

import ShortnerStyles from "../Shortner Page/Shortner.module.css"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Button
  } from "@chakra-ui/react"
import { Navbar } from "../../Components/Navbar/Navbar";
export function Shortner()
{

    const [url,setUrl]=React.useState("");
    const [userURLs,setuserURLs]=React.useState([]);

    async function getAllURLs()
    {
        try {
           const res= await fetch("/shortURLs",{
                headers:{"x-access-token":localStorage.getItem("token")}
            })
            const data=await res.json();
            setuserURLs(data.urls);
            console.log(data.urls);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleShorten()
    {
        
        try {
            let URL={
                long:url
            }
            const res=await fetch("/shortenURL",{
                method:"POST",
                headers:{"Content-type":"Application/json",
            "x-access-token":localStorage.getItem("token")},
                body:JSON.stringify(URL)
            })
            const data=await res.json();
            console.log(data.status);
            setUrl("");
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(()=>
    {
        getAllURLs();
    },[]);
    return(<>
    
        <Navbar/>
        <div className={ShortnerStyles.Container}>
            
            <div className={ShortnerStyles.InputBox}>
            <Input type="text"
                    padding="20px"
                    value={url}
                    onChange={(e)=>( setUrl(e.target.value))} placeholder='Enter URL for Shortening' size='lg' />
                <Button colorScheme='teal' size='lg'  onClick={handleShorten}>Shorten</Button>
            </div>
            <div >
                    {
                        userURLs.length!==0?
                        <div className={ShortnerStyles.UsersURLContainer}>
                            <TableContainer className={ShortnerStyles.TableContainer} >

                            <Table variant='striped' colorScheme='teal' >
                                <Thead>
                                    <Td>No.</Td>
                                    <Td>Full URL</Td>
                                    <Td>Short URL</Td>
                                    <Td>Number of Calls</Td>
                                </Thead>
                                <Tbody>
                                {
                                    userURLs?.map((item,i)=>
                                    (
                                        <Tr>
                                            <Td>{i+1}</Td>
                                            <Td>{item.long}</Td>
                                            <Td textDecoration="underline" textColor='blue'> <Link to={`/${item.short}`}> {item.short} </Link> </Td>
                                            <Td>{item.calls}</Td>
                                        </Tr>
                                    ))
                                }

                                </Tbody>
                                
                            </Table>

                            </TableContainer>
                            
                        </div>:
                        <div>

                        </div>
                    }
            </div>
        </div>
        </>
    )
}