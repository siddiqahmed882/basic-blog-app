import { useContext } from 'react';
import UserContext from '../context/UserContext';

const useUserContext = () => {
  const { state, activateUser, deactivateUser, deleteUser, createUser, fetchUserById } = useContext(UserContext);

  return { ...state, activateUser, deactivateUser, deleteUser, createUser, fetchUserById };
};

export default useUserContext;