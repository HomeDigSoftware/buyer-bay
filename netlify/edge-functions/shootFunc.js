

//  import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.1";
 import { createClient } from '@supabase/supabase-js'


// const { createClient } = require('@supabase/supabase-js');


export default async (event , context) =>{
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_PAY_CHECK;
    const apiKey = process.env.REACT_APP_SUPABASE_KEY;
     const supabase = createClient(supabaseUrl, apiKey);


    try {
            const{data, error} = await supabase.rpc('talk_to_kanya', {name: 'tzaf'})
            console.log("_____________________data",data )
            return  new Response("Hello, World!", {
                headers: { "content-type": "application/json" }
             } );
        
    }
 catch (error) {
    console.error('Error calling Supabase function:', error);
    console.log("_____________________error", error)
    return  new Response("Hello, World!", {
            headers: { "content-type": "application/json" }
         } );
    };
  

}

export const config = {path: '/shoot'};