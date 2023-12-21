import { Outlet , useParams  } from 'react-router-dom'
import React from 'react'



export default function TestPage() {
  const {id} = useParams();
  console.log("the id => " , id )
  
  return (
    <>
    <div clasName='' style={{color:'aliceblue'}}>Test {id}  Page</div>
    <main>
        <Outlet />
      </main>
    </>
  )
}

