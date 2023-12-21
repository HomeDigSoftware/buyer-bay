

function toDoOne(geo){
    console.log("to do one is " + geo.city)
}

export default async (req, { cookies, geo ,id }) => {
     if(geo.city !== ""){
         console.log("im a edge result" , id); 
         toDoOne(geo);
          return new Response("Hello, World!", req , {
           headers: { "content-type": "text/html" }
         });
     }
  };

  export const config = { path: "/do" };