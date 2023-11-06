import { useState } from "react"
import supabase from "../../services/supabase.js"


export default function BatUpdate() {
  const [dataUpdate, setDataUpdate] = useState({});

  // let email = update.new.email
  getBatUpdate(setDataUpdate , dataUpdate)
  console.log("start listen")
  return (
    <>
      <div>
        {/* User Account   */}
      
       </div>
       
      
      
    </>
  )
}

// function TheData(update_01) {

//   return (
//     <div>
//        {update_01 !== {}? update_01.map((data) => (console.log(data))) : <div></div>
// }
//     </div>
//   )
// }


 async function getBatUpdate(setDataUpdate , dataUpdate) {
  const batList = await supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'bat_list' },
      (payload) => {
        console.log('Change received!', payload.new)
        setDataUpdate(payload)
       setTheData(payload.new , dataUpdate)
       
      }
    )
    .subscribe()
}

function setTheData(data_in , dataUpdate , ){
  console.log("data in dataUpdate : " , dataUpdate)
//   setUpdate(data_in.id)
}