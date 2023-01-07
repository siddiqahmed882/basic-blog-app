import { useContext } from 'react';
import PostContext from '../context/PostContext';

const usePostContext = () => {
  const { state, createPost, deletePost, fetchPostById, editPost, fetchAllPosts, addComment, deleteComment, addReaction, removeReaction, updateReaction } = useContext(PostContext);

  return { ...state, createPost, deletePost, fetchPostById, editPost, fetchAllPosts, addComment, deleteComment, addReaction, removeReaction, updateReaction };
};

export default usePostContext;