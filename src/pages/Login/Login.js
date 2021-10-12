import React, { useState } from 'react'
import '../Login/Login.css'
import { Link } from "react-router-dom"
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import callToastify from '../../components/Toast/toast'

const Login = () => {
    const navigate = useNavigate()
    const [invalidCredentials, setInvalidCredentials] = useState('')
    const { loginHandler } = useAuth()
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })

    const loginUser = async () => {
        const response = await loginHandler(userCredentials);
        if (response.status === 200) {
            setUserCredentials({ email: '', password: '' });
            navigate('/videos');
            callToastify('Successfully logged in!', true)
        }
        else {
            setInvalidCredentials('Invalid email or passoword')
        }

    }

    return (
        <div className='login'>
            <div className="login-container">
                <div className='heading'>On the beat!</div>
                <div style={{ color: 'red' }}>{invalidCredentials}</div>
                <div className='login-inputs'>
                    <FiMail className='icon email-icon' />
                    <input type="text" placeholder='e-mail' value={userCredentials.email} onChange={(e) => {
                        setUserCredentials(prevalue => ({ ...prevalue, email: e.target.value }))
                    }} />
                </div>

                <div className='login-inputs'>
                    <RiLockPasswordLine className='icon password-icon' />
                    <input type="password" placeholder='password' value={userCredentials.password} onChange={(e) => {
                        setUserCredentials(prevalue => ({ ...prevalue, password: e.target.value }))
                    }} />
                </div>

                <div className='login-btn'>
                    <button onClick={() => loginUser()}>Login</button>
                </div>

                <div className='signup-link'>
                    <span>Don't have an account?
                        <Link to='/signup'>
                            <strong> Sign Up</strong>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login
