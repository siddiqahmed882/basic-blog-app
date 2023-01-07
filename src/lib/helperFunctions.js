import { formatDistance } from 'date-fns';

const formtalAllPostsResponse = (posts) => {
  return posts.map(post => ({
    ...post, comments: post.comments.length
  }));
};

const formatAllUsersResponse = (users) => {
  return users.reduce((acc, user) => (
    { ...acc, [user.id]: user }
  ), {});
};

const selectPostsByUserId = (posts, userId) => {
  return posts.filter((post) => post.userId === userId);
};

const formatDateForPost = (date) => {
  return formatDistance(new Date(date), new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });
};



export default {
  formtalAllPostsResponse,
  formatAllUsersResponse,
  selectPostsByUserId,
  formatDateForPost
};