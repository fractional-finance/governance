const axios = require('axios');

const BASE_URL = {
  local: process.env.VUE_APP_SUMSUB_LOCAL,
  server: process.env.VUE_APP_SUMSUB_SERVER
}; 

const headers = { 
}
const netlify = ".netlify/functions/api"
const env = "dev"
export const getAccessToken = async (id) => {
  const ID = id.slice(2)
  const url = `${BASE_URL.server}/${netlify}/${env}/${ID}`
  return await axios({
    method: "get",
    headers: headers,
    url: "https://leafy-gecko-65dc0a.netlify.app/.netlify/functions/api/dev/1"
  })
}

// https://api.weavr.org:9000/.netlify/functions/api/dev/404A9Ab87f0C51245FAc908cdcDa9f67F08Df980
// https://api.weavr.org/.netlify/functions/api/dev/dasdsada