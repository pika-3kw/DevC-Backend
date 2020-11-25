const axios = require('axios');

module.exports = async (id, token) => {
  try {
    const feed = await axios.get(
      `https://graph.facebook.com/${process.env.FB_API_VERSION}/${id}/feed?fields=permalink_url,message,created_time&access_token=${token}`
    );

    return feed.data;
  } catch (error) {
    return error.response.data;
  }
};
