import React from 'react';

const Login = ({firebase}) => {
  
  const handleGoogleLogin = (e) => {
    firebase.googleLogin();
  }

  return (
    <>
      <h1>로그인 페이지입니다.</h1>
      <button typte="button" onClick={handleGoogleLogin}>gogleLogin</button>
    </>
  )
}

export default Login;