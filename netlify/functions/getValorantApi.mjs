




export const handler = async (event , context) => {
    // console.log({event}, {context})
   const POKE_API = "https://pokeapi.co/api/v2/pokedex/kanto"
   const PANDA_API = "https://api.pandascore.co/valorant/matches/upcoming"
   const options = { 
    method : "GET",
    // mode : "no-cors",
    cache: "no-cache",
    credential: "same-origin",
    headers:{
        "Content-Type" : "application/json",
        authorization: 'Bearer zZPjgAB6F45VSq8m_KkFT3lRm6WACovbn1bzx-86Q3-CPK3IAH0'
    },
   }
   const response = await fetch(PANDA_API , options)
   const data = await response.json()
//    console.log(data)
    return{
        statusCode : 200, 
        body: JSON.stringify({
         //  pokemon: data
            // region: 'hoenn',
        //    teams01: data[0].videogame.name,
            // teams02: data01 = JSON.parse(data[0]),
             upcoming: data,
            // teams04: data[0].opponents[0].opponent,
            // teams05: data[0].opponents[0].opponent.image_url,
        
        //    all: data
        })
    }
}
