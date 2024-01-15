 
//_----------------------- not workig gooo (the redirect is not working )-------------------------------
// export default async (req, context) => {
//   const body = await req.json();
//   const header = req.headers;


//   const message = JSON.stringify(body.id)
//     console.log('000000000000000000000000' , JSON.stringify(body.id));
//     console.log('000000000000000000000000' , JSON.stringify(body.type));
//     console.log('000000000000000000000000' , JSON.stringify(body.api_version));
//     console.log("YYYYYYYYYYYY++++++++++++++++++++++++++++++++++++" ,JSON.stringify(body.data.object.amount))
   
//        const data = context.next( new Request(req ,{body: JSON.stringify(body) }  ));

//        const url = new URL( message , "https://homedigsoftware.com/hook-to-payment/")
//         console.log("the new url" , url )
//        return Response.redirect("https://homedigsoftware.com/hook-to-payment/" + message)
//   }
  
//   export const config = {path: '/read' };

//________________________________________________________________________________________________________
  // Assuming you receive the Stripe event data in the 'req' parameter
  //__________________________________________________________________
  // supabase URL =  https://tlgrpirsqcbfnvysjxwx.supabase.co   add /rest/v1/ for RestAPI
  //_________________________________________________________________
 import fetch from "fetch"
 import supabase from "../../src/services/supabase.js";
 export default async (req, { cookies, geo  }) => {
  // Extract the relevant data from the Stripe event
  // const eventData = req.body; // Assuming the Stripe event data is in the request body
  const body = await req.json();

  console.log(body.url +"/" +body.id , "BBBBBBBBBBBBBBBBBBBBB")
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", req)
  console.log("====================", body.type)
  console.log( "NEW URL => " , req.url +"/hook-to-payment/" +body.id)
  // Check if the Stripe event is related to a successful payment
  if (body.type === 'payment_intent.succeeded') {
      // Get the success URL from the Stripe event data
      const successUrl = body.data.receipt_url; // Replace this with the correct path or URL from your Stripe event
      console.log( " DDDDDDDDDDDDDDDDDDDDDDDDDDD",body.data.object)
      console.log( "NEW URL => ",req.url +"/" +body.id)
     
      
    //  let { data: payments, error01 } = await supabase
    //  .from("payments")
    //  .select("*");
    //     console.log(payments , " the paments data ")
     
    //   const { data, error } = await supabase
    //     .from("payments")
    //     .insert([{ payment_id: body.id, amount: "1110"}])
    //     .select();
    //     console.log("you just send a bat ")
       
      const options = {
           method : "POST",
           headers:{
                'Access-Control-Allow-Origin': '*',
                "Content-Type" : "application/json",
                "myheader-Type" : "tzaffFFFFFFDD",
                authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`
              }}

        const supabaseEndpoint = "https://yxckxaoqczjtpkasichg.supabase.co"
        const response = await fetch(supabaseEndpoint , options)
        const data001 = await response.json()
     
         return{
             statusCode : 200, 
             body: JSON.stringify({
                 upcoming:  data001,
             
             })
         }
        
     

    //   const supabaseEndpoint = 'https://tlgrpirsqcbfnvysjxwx.supabase.co/rest/v1/payments';
    //   const supabaseResponse = await fetch(supabaseEndpoint, {
    //     method: 'POST',
    //     body: JSON.stringify(req),
    //   headers:{
    //     'Access-Control-Allow-Origin': '*',
    //     "Content-Type" : "application/json",
    //     authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`
    // }});


    
      // Redirect the user to the success URL
      // return Response.redirect(req.url +"/hook-to-payment/" +body.id);
    
      // return Response.redirect("https://tlgrpirsqcbfnvysjxwx.supabase.co/rest/v1");
  } else {
      // Handle other types of Stripe events or do something else
      return new Response('Unhandled event type');
  }
};

export const config = {path: '/read' };