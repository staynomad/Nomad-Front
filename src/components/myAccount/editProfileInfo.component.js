import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../../utils/axiosConfig.js'
import {setUserInfo} from '../../redux/actions/userActions';
import './editProfile.css'
import "../createListing/createListing.css";

const CustomButton = withStyles (theme => ({
  root: {
    color: '#00B183',
    backgroundColor: 'transparent',
    border: '2px solid #00B183',
    borderRadius: '8px',
    font: 'inherit',
    fontSize: '16px',
    fontWeight: 'normal',
  },
})) (Button);

const EditProfileInfo = (props) => {
    const dispatch = useDispatch();
    const loginInfo = useSelector(state => state.Login)
    // const user = useSelector(state => state.User)
    const [ profileState, setProfileState ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)

    useEffect(() => {
        const userId = loginInfo.userInfo.session.userId;
        app.get(`/user/getUserInfo/${userId}`)
            .then(res => {
                dispatch(setUserInfo(res.data));
                setProfileState({
                    name: res.data.name,
                    email: res.data.email,
                    description: '',
                    image: ''})
            });
    }, [dispatch, loginInfo.userInfo.session.userId]);

    const handleSubmit = event => {
        event.preventDefault ();
        setSubmitted (!submitted);
        const userId = loginInfo.userInfo.session.userId;
        // route to update user information
        app.post (`/user/setUserInfo/${userId}`, profileState)
            .then (res => {
                // updates redux store
                dispatch(setUserInfo(res.data));
            })
    };


    const handleChange = event => {
        const value = event.target.value;
        setProfileState({...profileState, [event.target.name]: value})
    }

    return (
        <div className="container">
            <h2 style={{ color: "#02b188", textDecoration: "none" }}>Edit Profile</h2>
            <hr />
            {submitted ? <t>Your new profile information has been recorded!</t>
            :
            <form onSubmit={handleSubmit} style={{"text-align": "left"}}>
                <label id="name" value={profileState.name}>
                    <div className="editProfileLabel">Write your name: </div>
                    <input
                        className="editProfileInput"
                        type="text"
                        id="profileInfoName"
                        name="name"
                        value={profileState.name}
                        onChange={handleChange}
                    />
                </label>
                <div className="spacer_s"></div>
                <label id="email" value={profileState.email}>
                    <div className="editProfileLabel">Write your email: </div>
                    <input
                        className="editProfileInput"
                        type="text"
                        id="profileInfoEmail"
                        name="email"
                        value={profileState.email}
                        onChange={handleChange}
                    />
                </label>
                <div className="spacer_s"></div>
                <label id="description" value={profileState.description}>
                    <t>Write a description about yourself: </t>
                    <textarea
                        className="descriptionTextInputBox"
                        id="profileInfoDescription"
                        name="description"
                        placeholder={profileState.description}
                        onChange={handleChange}
                        rows='5'
                    />
                </label>
                {/*<label id="image" value={profileState.image}>
                    <t>Choose a profile image: </t>
                    <input
                        type="file"
                        id="profileInfoImage"
                        name="image"
                        placeholder={profileState.image}
                        onChange={handleChange}
                    />
                </label>*/}
                {submitted ? null :
                    <label id="submit">
                        <button type="submit" id="profileInfoSubmit" className="btn green">
                            Click here to submit your new profile information!
                        </button>
                    </label>
                }
            </form>
            }
            <hr />
            <div className="spacer_s"></div>
            <CustomButton>
                <NavLink to="/MyAccount">Back to your profile page!</NavLink>
            </CustomButton>
            <div className="spacer_l"></div>
        </div>
    )
};

export default EditProfileInfo;
