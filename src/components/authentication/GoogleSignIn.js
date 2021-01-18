import React from 'react'
// import { app } from '../../utils/axiosConfig.js'
import GoogleLogin from 'react-google-login'
import { submitGoogleLogin } from "../../redux/actions/authActions"

const clientID = '799198545666-1s1bu2dvg1n4hj9hgpbjsecjhrbkbhc8.apps.googleusercontent.com'

const GoogleSignIn = props => {

  const handleLogin = googleData => {
    console.log('test')
    submitGoogleLogin(googleData)
    console.log('test2')
  }

  /*const handleLogin = async googleData => {
    const loginRes = await app({
      method: 'post',
      url: '/googleLogin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ token: googleData.tokenId })
    })
    submitGoogleLogin(loginRes)
  }*/

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