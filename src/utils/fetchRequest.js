import axios from 'axios';

const production = process.env.NODE_ENV === "production";
const apiBaseUrl = production ? 'http://vhomes-back-dev.us-west-2.elasticbeanstalk.com' : 'http://localhost:8080';

export default async function handleReq(endpoint, methodType, customHeaders, data) {
  try {
    const res = await axios({
      method: methodType,
      url: `${apiBaseUrl}${endpoint}`,
      headers: customHeaders,
      redirect: "follow",
      data: data,
    });

    return res;
  } catch (e) {
    return e.response;
  }

}

// module.exports = { handleAuth };
