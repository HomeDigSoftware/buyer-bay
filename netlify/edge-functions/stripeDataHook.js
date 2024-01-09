//  import { createClient } from '@supabase/supabase-js'
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.1"

    var receipt = "";
    var client_sec = "";
    var stripe_Event = "";

// geting the  data from stripe
export default async (req) =>{
    
    const supabaseUrl_Pay = process.env.REACT_APP_SUPABASE_URL_PAY_CHECK;  
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
    const apiKey = process.env.REACT_APP_SUPABASE_KEY;

    const supabase = createClient(supabaseUrl, apiKey)
   
    const data_in = await req.json();
    stripe_Event = data_in.type
    console.log("the event type ==>" , data_in.type)
    console.log("the event data ==>" , data_in)

    console.log("_______________________________________________________________________")

    if(data_in.type === "charge.succeeded"){
        console.log("the event  ==> " , data_in.type)
        console.log("the receipt ==> " , data_in.data.object.receipt_url)
        console.log("_______________________________________________________________________")
        receipt = data_in.data.object.receipt_url;
       
       
    }
    if(data_in.type === "payment_intent.created"){
        console.log("the event  ==> " , data_in.type)
        console.log("the client_secret ==> " , data_in.data.object.client_secret)
        console.log("_______________________________________________________________________")
        client_sec = data_in.data.object.client_secret;     
    }   
   
   
  
    if(data_in.type === "payment_intent.succeeded" || data_in.type === "checkout.session.completed"){
  
      switch (data_in.type) {
        case "payment_intent.succeeded":

        console.log('stripe EVENT ====> ' ,  stripe_Event);
        //   let client_name = "testing_data";
        //   console.log(" data_in.data.object.id =======>" ,
        //                 data_in.data.object.id , "name : ====> " ,
        //                  ) //data_in.data.object.shipping.name
        //    await supabase.rpc('pass_to_db', { name_input : client_name , pay_id : data_in.data.object.id})
        //   .then(data => console.log('Success==>:', data))
        //   .catch(error => console.log('Error:', error));
          console.log("_______________________________________________________________________")
        
          // console.log('supabase.rpc==>  the resss', data);
        //   const the_event = "payment_intent";
        //   const postData_succ = {
           
        //     payment_id: data_in.data.object.id,
        //     // amount: data_in.api_version,
        //     amount: data_in.data.object.amount,
        //     receipt_url: receipt,
        //     client_sec: client_sec,
        //     event: the_event ,
        //   };
        //   newFunction(postData_succ, apiKey, supabaseUrl_Pay);
       
           break;

        case "checkout.session.completed":
           console.log('stripe EVENT ====> ', data_in.data.object.customer_details.name ,  stripe_Event ,"AAAAAAAAAAAAAAAAAAAAAAAAAAA" , data_in.data.object.payment_intent);
            let client_name = data_in.data.object.customer_details.name ;
            await supabase.rpc('pass_to_db', { name_input : client_name , pay_id : data_in.data.object.payment_intent})
            .then(data => console.log('Success==>:', data))
            .catch(error => console.log('Error:', error));
            console.log("_______________________________________________________________________")
        //   const the_event_01 = "checkout.session";
        //   const postData_comp = {
           
        //     payment_id: data_in.data.object.id,
        //     client_sec: data_in.data.object.payment_intent,
        //     // amount: data_in.api_version,
        //     amount: data_in.data.object.amount_total,
        //     email: data_in.data.object.customer_details.email,
        //     name: data_in.data.object.customer_details.name,

        //     event: the_event_01 , 
        //   };
        //   newFunction(postData_comp, apiKey, supabaseUrl_Pay);
          break;
      }
    }
    console.log("_____________________", data_in.data.object.id)
    console.log("_____________________", data_in.data.object.amount)
    console.log("_____________________", data_in.id)
  console.log("______________________" , data_in.data.object.client_secret)
  return new Response("Hello, World!", {
    headers: { "content-type": "application/json" }
  }); 
}


function newFunction(postData, apiKey, supabaseUrl_Pay) {


  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
    },
    body: JSON.stringify(postData),
  };

  fetch(supabaseUrl_Pay, reqOptions)
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Error:', error));
}

export const config = {path: '/stripeDataHook'};
