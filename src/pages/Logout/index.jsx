import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => navigate('/'));
  }, [navigate, logout]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 mt-5">
      <BounceLoader color="red" />
      <p className="font-mono">Logging out ...</p>
    </div>
  );
};

export default Logout;
