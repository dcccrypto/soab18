const axios = require('axios');
let data = JSON.stringify({
   "query": "{\n  solana(network: solana) {\n    transfers(\n      currency: {is: \"25p2BoNp6qrJH5As6ek6H7Ei495oSkyZd3tGb97sqFmH\"}\n      signer: {is: \"7wtbTXc7Lyxt1enezJa7eNyNxenaLYsmBeiZTsA3KvwL\"}\n      options: {desc: \"block.timestamp.time\"}\n    ) {\n      amount\n      block {\n        timestamp {\n          time\n        }\n      }\n    }\n  }\n}",
   "variables": "{}"
});

let config = {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://graphql.bitquery.io',
   headers: { 
      'Content-Type': 'application/json', 
      'X-API-KEY': 'htfzd', 
      'Authorization': 'gf'
   },
   data : data
};

axios.request(config)
.then((response) => {
   console.log(JSON.stringify(response.data));
})
.catch((error) => {
   console.log(error);
});