import axios from "axios";
// These parameters should be used for all requests
const SUMSUB_APP_TOKEN = process.env.VUE_APP_SUMSUB_TOKEN
const SUMSUB_SECRET_KEY = process.env.VUE_APP_SUMSUB_SECRET_KEY
const SUMSUB_BASE_URL = 'https://api.sumsub.com'; 

// curl -X POST \
//   'https://api.sumsub.com/resources/applicants?levelName=basic-kyc-level' \
//   -H 'Content-Type: application/json' \
//   -d '{
//           "externalUserId": "someUniqueUserId",
//           "email": "john.smith@sumsub.com",
//           "phone": "+449112081223",
//           "fixedInfo": {
//               "country": "GBR",
//               "placeOfBirth": "London"
//           }
//       }'


axios.interceptors.request.use(createSignature, function (error) {
        return Promise.reject(error);
})

var config = {};
config.baseURL= SUMSUB_BASE_URL;

function createSignature(config) {
    console.log('Creating a signature for the request...');
  
    var ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac('sha256',  SUMSUB_SECRET_KEY);
    signature.update(ts + config.method.toUpperCase() + config.url);
  
    if (config.data instanceof FormData) {
      signature.update(config.data.getBuffer());
    } else if (config.data) {
      signature.update(config.data);
    }
  
    config.headers['X-App-Access-Ts'] = ts;
    config.headers['X-App-Access-Sig'] = signature.digest('hex');
  
    return config;
  }
  

export class SumSubClient {
    path = {
        applicants: "applicants/"
    }
    constructor(accessToken) {
        this.token = accessToken;
    }

    createSignature(config) {
        console.log('Creating a signature for the request...');
      
        var ts = Math.floor(Date.now() / 1000);
        const signature = crypto.createHmac('sha256',  SUMSUB_SECRET_KEY);
        signature.update(ts + config.method.toUpperCase() + config.url);
      
        if (config.data instanceof FormData) {
          signature.update(config.data.getBuffer());
        } else if (config.data) {
          signature.update(config.data);
        }
      
        config.headers['X-App-Access-Ts'] = ts;
        config.headers['X-App-Access-Sig'] = signature.digest('hex');
      
        return config;
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
  
    config.method = method;
    config.url = url;
    config.headers = headers;
    config.data = null;
  
    return config;
  }
  

}