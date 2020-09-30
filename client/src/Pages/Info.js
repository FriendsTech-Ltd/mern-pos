import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';

const Info = () => {
  const authContext = useContext(AuthContext);
  const { serverMessage} = authContext;

  return (
    <div>
      <h1>{serverMessage}</h1>
    </div>
  )
}

export default Info;