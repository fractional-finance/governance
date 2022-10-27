const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; 
const headers = { }

const SALT = process.env.VUE_APP_SUMSUB_SALT

export const getAccessToken = async (id) => {
  const ID = id.slice(8)
  const url = BASE_URL + "/" + ID
  
   return await axios({
        method: "get",
        headers: headers,
        url: url
      })
}