const axios = require('axios');

module.exports = async (id, token, updatedAt = 1) => {
  try {
    const comments = await axios.get(
      `https://graph.facebook.com/${process.env.FB_API_VERSION}/${id}/comments?fields=created_time,from,message,message_tags,permalink_url,parent,comment_count&since=${updatedAt}&access_token=${token}`
    );

    return comments.data;
  } catch (error) {
    return error.response.data;
  }
};
