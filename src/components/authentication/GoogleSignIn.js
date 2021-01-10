import React from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'

const clientID = '799198545666-1s1bu2dvg1n4hj9hgpbjsecjhrbkbhc8.apps.googleusercontent.com'

const GoogleSignIn = () => {

  const handleLogin = async googleDetails => {
    const response = await axios.post()
  }

  return (
    <>
      <GoogleLogin
        clientId={clientID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}

export default GoogleSignIn