
export const handler = async (event , context) => {
    console.log(" the handler event",{event})
    console.log(" the handler context",{context})
   const PANDA_API = "https://api.pandascore.co/lol/matches/upcoming"
   const options = { 
    method : "GET",
    // mode : "no-cors",
    cache: "no-cache",
    credential: "same-origin",
    params: {
        sort: 'begin_at',
        page: '1',
        per_page: '5',
      },
    headers:{
        "Content-Type" : "application/json",
        authorization: 'Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
    },
   }
   const response = await fetch(PANDA_API , options)
   const data = await response.json()

    return{
        statusCode : 200, 
        body: JSON.stringify({
            data,
        
        })
    }
}