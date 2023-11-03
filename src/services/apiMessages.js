import supabase from "./supabase.js"


export async function getMessages(){

const { data, error } = await supabase
.from('messages')
.select('*')
//.select('message')

if(error)
{
    console.error(error)
    throw new Error('message could not be loaded ')
}

return data;

}