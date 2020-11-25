const axios = require('axios');

module.exports = async (token) => {
  try {
    const userInfo = await axios.get(
      `https://graph.facebook.com/${process.env.FB_API_VERSION}/me?fields=id,name,email,accounts{name,app_id}&access_token=${token}`
    );

    return userInfo.data;
  } catch (error) {
    return error.response.data;
  }
};
