import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        color: 'white',
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <button
        className="button"
        style={{
          width: '200px',
          position: 'relative',
          left: '39%',
          transform: 'translateY(100%)',
        }}
        onClick={signIn}
        type="button"
      >Sign In
      </button>
    </div>
  );
}

export default Signin;
