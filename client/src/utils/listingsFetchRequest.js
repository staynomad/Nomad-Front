const production = process.env.NODE_ENV === 'production';
const apiBaseUrl = production ? 'https://vhomesback.herokuapp.com': 'http://localhost:8080';

export default function handleReq (endpoint, methodType, customHeaders, data) {
  console.log ("inside RIGHT handleReq. here's some info: ", endpoint);
  console.log ('methodType? ', methodType);

  return fetch (`${apiBaseUrl}${endpoint}`, {
    method: methodType,
    headers: customHeaders,
    redirect: 'follow',
    body: JSON.stringify (data),
  }).then (res => {
    return res;
  });
}

// module.exports = { handleAuth };
