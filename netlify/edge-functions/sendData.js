//  import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.1"
 import { createClient } from '@supabase/supabase-js'

  var receipt = "";
    var client_sec = "";

export default async (req) =>{
  
    const data_in = await req.json();
    
    // const supabaseUrl = "https://tlgrpirsqcbfnvysjxwx.supabase.co/rest/v1/payments"
     const supabaseUrl_Pay = process.env.REACT_APP_SUPABASE_URL_PAY_CHECK;  
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_NEW_DB
    // const apiKey = process.env.REACT_APP_SUPABASE_KEY;
    const apiKey = process.env.REACT_APP_SUPABASE_KEY_NEW_DB;
    const supabase = createClient(supabaseUrl, apiKey)

    


    console.log("data in typeeeeee" , data_in.type)
    if(data_in.type === "charge.succeeded"){
        receipt = data_in.data.object.receipt_url;
        console.log("the receipt ==> " , receipt)
    }
    if(data_in.type === "payment_intent.created"){
        client_sec = data_in.data.object.client_secret;
        // const { data, error } = await supabase.rpc(`get_user_payment(${data_in.id})`)
        const info = data_in.id
        
   
    if (error) console.error(error);
    else console.log(data);


        const the_r = await data;
        console.log("client ====> ", client_sec ,"======>>>>" , the_r)
    }
  
    if(data_in.type === "payment_intent.succeeded" || data_in.type === "checkout.session.completed"){
      console.log("+++++++__+++++++++++", data_in.type, "++++___++++++++");
      switch (data_in.type) {
        case "payment_intent.succeeded":
          // const name_input = 'client_testing';
          // const pay_id = data_in.data.object.id;
          let client_name = "testing_data"
          console.log(" data_in.data.object.id =======>" ,
                        data_in.data.object.id , "name : ====> " ,
                         ) //data_in.data.object.shipping.name
          let rpc_Func = await supabase.rpc('pass_to_db', { name_input : client_name , pay_id : data_in.data.object.id})
          .then(data => console.log('Success==>:', data))
          .catch(error => console.log('Error:', error));
          // console.log('supabase.rpc==>  the resss', data);
          const the_event = "payment_intent";
          const postData_succ = {
           
            payment_id: data_in.data.object.id,
            // amount: data_in.api_version,
            amount: data_in.data.object.amount,
            receipt_url: receipt,
            client_sec: client_sec,
            event: the_event ,
          };
          newFunction(postData_succ, apiKey, supabaseUrl_Pay);
       
           break;

        case "checkout.session.completed":
          const the_event_01 = "checkout.session";
          const postData_comp = {
           
            payment_id: data_in.data.object.id,
            client_sec: data_in.data.object.payment_intent,
            // amount: data_in.api_version,
            amount: data_in.data.object.amount_total,
            email: data_in.data.object.customer_details.email,
            name: data_in.data.object.customer_details.name,

            event: the_event_01 , 
          };
          newFunction(postData_comp, apiKey, supabaseUrl_Pay);
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

export const config = {path: '/senddata'};
