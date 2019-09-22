let axios = require("axios")


const client = axios.create({
 baseURL: '', //proxy in the package.json will be the baseURL
 json: true
});


exports.get_score = function(params, cb){
  return client({
     method: 'get',
     url: '/score',
     params: params
   }).then(checkStatus).then(cb).catch(error => {
     if (error.response) {
       cb({data: error.response.data, response: error.response.status})
      }
   })
}

function checkStatus(response){
  if (response.status >= 200 && response.status < 300) {
    // console.log('checking status code', response.data)

    return {data: response.data, status:response.status};
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  // console.log(error); // eslint-disable-line no-console
  throw error;
}
