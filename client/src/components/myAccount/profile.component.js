import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userActions';
import axios from 'axios';

const Profile = () => {
    const loginInfo = useSelector(state => state.Login);
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();
    const isEmpty = Object.keys(user).length === 0;

    useEffect(() => {
        const userId = loginInfo.userInfo.session.userId;
        axios.get (`http://localhost:8080/user/getUserInfo/${userId}`)
        .then (res => {
            dispatch(setUserInfo(res.data))
        })
        .catch (err => {
            console.log ('error: ', err.response);
        })
    }, []);

    const Greeting = () => {
        if (!isEmpty) {
            return (
                <h2 style={{ color: "#02b188", textDecoration: "none" }}>Welcome, {user.userInfo.name}!</h2>
            )

        } else {
            // Would be nice to have a loading symbol
            return null
        }
    }

    const Information = () => {
        if (!isEmpty) {
            return (
                <t>Email: { user.userInfo.email }</t>
            )
        } else {
            return null
        }
    }

    return (
        <div>
            <Greeting />
            <hr />
            <Information />
            <hr />
            <form action="/EditProfileInfo">
                <button className="login btn green" style={{width: '30%'}}> EDIT PROFILE </button>
            </form>
        </div>
    )
}

export default Profile;