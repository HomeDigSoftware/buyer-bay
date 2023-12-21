



// export default () => new Response("Hello world");

export default async (req, { cookies, geo }) => {
    if (  geo.city !== "" ) {
      console.log("redirect to homedigsoftware")
      const url = new URL("https://homedigsoftware.com")
  
      return Response.redirect(url)
    }
  }
  



export const config = { path: "/test" };