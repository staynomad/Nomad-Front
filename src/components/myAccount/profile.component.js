import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userActions';
import { app } from '../../utils/axiosConfig.js'

const Profile = () => {
    const loginInfo = useSelector(state => state.Login);
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();
    const isEmpty = Object.keys(user).length === 0;

    useEffect(() => {
        const userId = loginInfo.userInfo.session.userId;
        app.get(`/user/getUserInfo/${userId}`)
            .then(res => {
                dispatch(setUserInfo(res.data))
            })
    }, [dispatch, loginInfo.userInfo.session.userId]);

    const Greeting = () => {
        if (!isEmpty) {
            return (
                <h2 style={{ color: "#02b188", textDecoration: "none" }}>Welcome, {user.userInfo.name}!</h2>
            )

        } else {
            return null
        }
    }

    const Information = () => {
        if (!isEmpty) {
            return (
                <div style={{"padding": "20px"}}>
                    <div>Email: {user.userInfo.email}</div>
                    <br />
                    {user.userInfo.description ? <p>Description: {user.userInfo.description}</p> : <div>Add your description to get started!</div>}
                </div>
            )
        } else {
            return (
                <div>Add your description to get started!</div>
            )
        }
    }

    return (
        <div>
            <Greeting />
            <hr />
            <Information />
            <hr />
            <form action="/EditProfileInfo">
                <button className="btn green"> Edit Profile </button>
            </form>
        </div>
    )
}

export default Profile;