const axios = require("axios");
const crypto = require("crypto");

// These parameters should be used for all requests
const SUMSUB_APP_TOKEN = process.env.VUE_APP_SUMSUB_TOKEN
const SUMSUB_SECRET_KEY = process.env.VUE_APP_SUMSUB_SECRET_KEY
const SUMSUB_BASE_URL = 'https://api.sumsub.com'; 


export class SumSubClient {
    path = {
        applicants: "applicants/"
    }
    config = {
        url: SUMSUB_BASE_URL,
        method: "post"
    }
    constructor() {
        axios.interceptors.request.use(this.createSignature, function (error) {
            return Promise.reject(error);
    })
    }

    createSignature() {
        console.log('Creating a signature for the request...');
      
        var ts = Math.floor(Date.now() / 1000);
        const signature = crypto.createHmac('sha256',  SUMSUB_SECRET_KEY);
        signature.update(ts + this.config.method.toUpperCase() + this.config.url);
      
        // if (this.config.data instanceof FormData) {
        //   signature.update(this.config.data.getBuffer());
        // } else if (this.config.data) {
        //   signature.update(this.config.data);
        // }
      
        this.config.headers['X-App-Access-Ts'] = ts;
        this.config.headers['X-App-Access-Sig'] = signature.digest('hex');
      
        // return this.config;
      }

    
    // https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
    createAccessToken (externalUserId, levelName = 'basic-kyc-level', ttlInSecs = 600) {
    console.log("Creating an access token for initializng SDK...");
  
    var method = 'post';
    var url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;
  
    var headers = {
        'Accept': 'application/json',
        'X-App-Token': SUMSUB_APP_TOKEN
    };
  
    this.config.method = method;
    this.config.url = url;
    this.config.headers = headers;
    this.config.data = null;
  
    // return this.config;
  }
  

}