const axios = require('axios');

const BASE_URL = {
  local: process.env.VUE_APP_SUMSUB_LOCAL,
  server: process.env.VUE_APP_SUMSUB_SERVER
}; 

const headers = { 
}
const netlify = ".netlify/functions/api"
const env = "prod"
export const getAccessToken = async (id) => {
  const ID = id.slice(2)
  const url = `https://api.weavr.org/${netlify}/${env}/${ID}`
  return await axios({
    method: "get",
    headers: headers,
    url: url
  })
}
