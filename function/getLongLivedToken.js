const axios = require('axios');

module.exports = async (token) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${process.env.FB_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${token}`
    );

    const { access_token } = response.data;

    return access_token;
  } catch (error) {
    console.log(error);
  }
};
