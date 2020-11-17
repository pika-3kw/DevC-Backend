const Comment = require('../../models/comment');
const Post = require('../../models/post');

const getFeed = require('../../function/getFeed');
const getComments = require('../../function/getComments');

exports.getFeed = async (req, res, next) => {
  const { id } = req.params;

  const { token } = req.user.facebook;

  try {
    const feed = await getFeed(id, token);

    res.status(200).send(feed.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.getComments = async (req, res, next) => {
  const { id } = req.params;

  const { token } = req.user.facebook;

  try {
    const post = await Post.findOne({ id });

    const postId = post._id;

    const updatedAt = post.updatedAt;
    const createdAt = post.createdAt;

    let timeStart = 1;

    if (updatedAt > createdAt) {
      timeStart = Math.round(post.updatedAt.getTime() / 1000);
    }

    let result = await getComments(id, token);

    if (result.error) {
      res.status(501).send(result.error);
      return;
    }

    let comments = result.data;

    let replyIdList = comments
      .filter((cmt) => cmt.comment_count > 0)
      .map((cmt) => cmt.id);

    for (let i = 0; i < replyIdList.length; i++) {
      const result = await getComments(replyIdList[i], token, 1);
      let replies = result.data;

      if (replies) {
        replies = replies.map((rep) => ({ ...rep, parent: rep.parent.id }));
        comments.push(...replies);
      }
    }

    comments = comments.map((cmt) => ({
      ...cmt,
      post: postId,
      message_raw: cmt.message,
    }));

    comments.forEach((cmt) => {
      if (cmt.message_tags) {
        for (let i = cmt.message_tags.length - 1; i >= 0; i--) {
          cmt.message = cmt.message.replace(cmt.message_tags[i].name, '');
        }
      }
      cmt.message = cmt.message.replace(/ {2,}/, ' ').trim();
    });

    result = await Comment.insertMany(comments, { ordered: false });

    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: result,
      },
    });

    res.status(201).send(result);
  } catch (error) {
    console.log(error);

    if (error.name === 'BulkWriteError') {
      return res.status(201).send(error.insertedDocs);
    }
    return res.status(500).send(error);
  }
};
