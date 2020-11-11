import axios from 'axios';

const production = process.env.NODE_ENV === "production";
const apiBaseUrl = production ? 'https://vhomesback.herokuapp.com' : 'http://localhost:8080';

export default async function handleReq(endpoint, methodType, customHeaders, data) {
  const res = await axios({
    method: methodType,
    url: `${apiBaseUrl}${endpoint}`,
    headers: customHeaders,
    redirect: "follow",
    data: data,
  });

  return res;
}

// module.exports = { handleAuth };
