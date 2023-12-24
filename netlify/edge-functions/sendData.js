var receipt = "";
var client_sec = "";
export default async (req  ) =>{
    
    const data_in = await req.json();
    
    // const supabaseUrl = "https://tlgrpirsqcbfnvysjxwx.supabase.co/rest/v1/payments"
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_PAY_CHECK;
     const apiKey = process.env.REACT_APP_SUPABASE_KEY;

    if(data_in.type === "charge.succeeded"){
        receipt = data_in.data.object.receipt_url;
        console.log("the receipt ==> " , receipt)
    }
    if(data_in.type === "payment_intent.created"){
        client_sec = data_in.data.object.client_secret;
        console.log("client ====> ", client_sec)
    }
  
    if(data_in.type === "payment_intent.succeeded"){
            console.log("++++++++++++++++++", data_in.type , "++++++++++++" , receipt)
    
    const postData = {
        payment_id : data_in.id ,
        // amount: data_in.api_version,
        amount: data_in.data.object.amount ,
        receipt_url : receipt,
        client_sec: client_sec,
    }

    const reqOptions = {
        method: 'POST' , 
        headers: {
            'Content-Type' : 'application/json' , 
            'apikey' : apiKey,
        },
        body: JSON.stringify(postData),
    };

    fetch(supabaseUrl , reqOptions)
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Error:', error));

  }
  console.log(data_in.id)
  console.log(client_sec)

}

export const config = {path: '/senddata'};