import { useContext } from 'react';
import PostContext from '../context/PostContext';

const usePostContext = () => {
  const { state, createPost, deletePost, fetchPostsByUser } = useContext(PostContext);

  return { ...state, createPost, deletePost, fetchPostsByUser };
};

export default usePostContext;