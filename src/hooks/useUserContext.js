import { useContext } from 'react';
import UserContext from '../context/UserContext';

const useUserContext = () => {
  const { state, activateUser, deactivateUser, deleteUser, createUser } = useContext(UserContext);

  return { ...state, activateUser, deactivateUser, deleteUser, createUser };
};

export default useUserContext;