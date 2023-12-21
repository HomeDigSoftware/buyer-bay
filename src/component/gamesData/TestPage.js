import { Outlet , useParams  } from 'react-router-dom'
import React from 'react'



export default function TestPage({value}) {
  console.log(value)
  const {id} = useParams();
  return (
    <>
    <div clasName='' style={{color:'aliceblue'}}>Test {id}  Page</div>
    <main>
        <Outlet />
      </main>
    </>
  )
}

