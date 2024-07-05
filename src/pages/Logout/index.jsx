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
    <div>
      <BounceLoader color="red" />
      Logging out ...
    </div>
  );
};

export default Logout;
