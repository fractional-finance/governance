const axios = require('axios');

const BASE_URL = process.env.VUE_APP_SUMSUB_SERVER; 
const headers = { }


export const getAccessToken = async (id) => {
  const ID = id.slice(2)
  const url = BASE_URL + "/" + ID
  
   return await axios({
        method: "get",
        headers: headers,
        url: url
      })
}

export const style = require("./style.css")