import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {setUserInfo} from '../../redux/actions/userActions';

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
    const user = useSelector(state => state.User)
    const [ profileState, setProfileState ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)

    useEffect(() => {
        const userId = loginInfo.userInfo.session.userId;
        axios.get(`http://localhost:8080/user/getUserInfo/${userId}`)
            .then(res => {
                dispatch(setUserInfo(res.data));
                setProfileState({
                    name: res.data.name,
                    email: res.data.email,
                    description: '',
                    image: ''})
            })
            .catch(err => {
                console.log('error: ', err.response);
            });
    }, []);

    const handleSubmit = event => {
        event.preventDefault ();
        setSubmitted (!submitted);
        const userId = loginInfo.userInfo.session.userId;
        // route to update user information
        axios.post (`http://localhost:8080/user/setUserInfo/${userId}`, profileState)
            .then (res => {
                // updates redux store
                dispatch(setUserInfo(res.data));
            })
            .catch (err => {
            console.log ('handleSubmit error: ', err.response);
        });
    };


    const handleChange = event => {
        const value = event.target.value;
        setProfileState({...profileState, [event.target.name]: value})
    }

    return (
        <div className="container">
            <br /><br /><br />
            <h2 style={{ color: "#02b188", textDecoration: "none" }}>Submit changes to your profile information!</h2>
            <hr />
            {submitted ? <t>Your new profile information has been recorded!</t>
            :
            <form onSubmit={handleSubmit} style={{"text-align": "left"}}>
                <label id="name" value={profileState.name}>
                    <t>Write your name: </t>
                    <input
                        className="login_bar"
                        type="text"
                        id="profileInfoName"
                        name="name"
                        placeholder={profileState.name}
                        onChange={handleChange}
                    />
                </label>
                <br /><br />
                <label id="email" value={profileState.email}>
                    <t>Write your email: </t>
                    <input
                        className="login_bar"
                        type="text"
                        id="profileInfoEmail"
                        name="email"
                        placeholder={profileState.email}
                        onChange={handleChange}
                    />
                </label>
                <br /><br />
                <label id="description" value={profileState.description}>
                    <t>Write a description about yourself: </t>
                    <textarea
                        className="login_bar"
                        id="profileInfoDescription"
                        name="description"
                        placeholder={profileState.description}
                        onChange={handleChange}
                        rows='5'
                    />
                </label>
                <br /><br />
                <label id="image" value={profileState.image}>
                    <t>Choose a profile image: </t>
                    <input
                        type="file"
                        id="profileInfoImage"
                        name="image"
                        placeholder={profileState.image}
                        onChange={handleChange}
                    />
                </label>
                {submitted ? null :
                    <label id="submit">
                        <button type="submit" id="profileInfoSubmit" className="btn green" style={{width: '80%'}}>
                            Click here to submit your new profile information!
                        </button>
                    </label>
                }
            </form>
            }
            <hr />
            <CustomButton>
                <NavLink to="/MyAccount">Back to your profile page!</NavLink>
            </CustomButton>
        </div>
    )
};

export default EditProfileInfo;
