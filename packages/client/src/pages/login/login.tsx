import React from 'react';
import { Spinner } from '../../component/spinner/spinner';

const Login = () => {
  return (
    <p style={{ padding: '20px' }}>
      <Spinner visuallyHiddenLabel={''} />
      <br />
      <Spinner variant={'grow'} visuallyHiddenLabel={''} />
      <br />
      <button>
        <Spinner visuallyHiddenLabel={''} />
      </button>
      <br />
      <button>
        <Spinner variant={'grow'} visuallyHiddenLabel={''} />
      </button>
    </p>
  );
};

export default Login;
