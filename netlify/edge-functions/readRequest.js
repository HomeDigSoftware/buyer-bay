// import Stripe from "stripe";

// import supabase from '@supabase/supabase-js'
// //  const Supabase = require("@supabase/supabase-js");
// // const supabase = Supabase();

// const checkTable = async () => {
//   let { data: payments, error } = await supabase
//   .from('payments')
//   .select('*')
//   console.log(' supabase table data from payments' , payments)
// };

//  async (req, { cookies, geo }) => {
//   if (
//     geo.city === "Paris" &&
//     cookies.get("promo-code") === "15-for-followers"
//   ) {
//     const url = new URL("/hook-to-payment/" + , req.url)

//     return Response.redirect(url)
//   }
// }


export default async (req, context) => {

// const stripe = Stripe(process.env.REACT_APP_SECRET_STRIPE_KEY);
  const body = await req.json();
  const header = req.headers;
  // checkTable();
  // const event = await stripe.events.retrieve(JSON.stringify(body.id))
  // const sig = header.text();
  // const sig_jaon = JSON.stringify(sig);
  // if (!isValid(body.access_token)) {
    //   return new Response("forbidden", { status: 403 })
    // }
  const message = JSON.stringify(body.id)
    // console.log('000000000000000000000000' , JSON.stringify(body.id));
    // console.log('000000000000000000000000' , JSON.stringify(body.type));
    // console.log('000000000000000000000000' , JSON.stringify(body.api_version));
    // console.log("YYYYYYYYYYYY++++++++++++++++++++++++++++++++++++" ,JSON.stringify(body.data.object.amount))
    // checkTokens();
       const data = context.next( new Request(req ,{body: JSON.stringify(body) }  ));

       const url = new URL( message , "https://homedigsoftware.com/hook-to-payment/")
        console.log("the new url" , url )
       return Response.redirect(url.href)
  }
  

  

  export const config = {path: '/read' };