import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientID = '799198545666-1s1bu2dvg1n4hj9hgpbjsecjhrbkbhc8.apps.googleusercontent.com'

const GoogleSignUp = () => {

  const handleLogin = () => {
    console.log('someone pressed the Google button')
  }

  return (
    <>
      <GoogleLogin
        clientID={clientID}
        buttonText='Log in with Google'
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </>
  )
}

export default GoogleSignUp