

  var receipt = "";
    var client_sec = "";

export default async (req) =>{
  
    const data_in = await req.json();
    
    // const supabaseUrl = "https://tlgrpirsqcbfnvysjxwx.supabase.co/rest/v1/payments"
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_PAY_CHECK;
    // const apiKey = process.env.REACT_APP_SUPABASE_KEY;
    const apiKey = process.env.REACT_APP_SUPABASE_KEY;
    console.log("data in typeeeeee" , data_in.type)
    if(data_in.type === "charge.succeeded"){
        receipt = data_in.data.object.receipt_url;
        console.log("the receipt ==> " , receipt)
    }
    if(data_in.type === "payment_intent.created"){
        client_sec = data_in.data.object.client_secret;
        console.log("client ====> ", client_sec)
    }
  
    if(data_in.type === "payment_intent.succeeded" || data_in.type === "checkout.session.completed"){
      console.log("+++++++__+++++++++++", data_in.type, "++++___++++++++");
      switch (data_in.type) {
        case "payment_intent.succeeded":
          const postData_succ = {
            payment_id: data_in.id,
            // amount: data_in.api_version,
            amount: data_in.data.object.amount,
            receipt_url: receipt,
            client_sec: client_sec,
          };
          newFunction(postData_succ, apiKey, supabaseUrl);
          break;

        case "checkout.session.completed":
          const postData_comp = {
            payment_id: data_in.id,
            // amount: data_in.api_version,
            amount: data_in.data.object.amount_total,
            email: data_in.data.object.customer_details.email,
            name: data_in.data.object.customer_details.name,
          };
          newFunction(postData_comp, apiKey, supabaseUrl);
          break;
      }
    }
  console.log("_____________________", data_in.id)
  console.log("______________________" , data_in.data.object.client_secret)
  return new Response("Hello, World!", {
    headers: { "content-type": "application/json" }
  }); 
}


function newFunction(postData, apiKey, supabaseUrl) {


  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey,
    },
    body: JSON.stringify(postData),
  };

  fetch(supabaseUrl, reqOptions)
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Error:', error));
}

export const config = {path: '/senddata'};
