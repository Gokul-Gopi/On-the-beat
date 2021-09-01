import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import Navbar from '../../components/Header/Header'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'

const SignUp = () => {

    const navigate = useNavigate()
    const { signUpHandler } = useAuth()
    const [userDetails, setuserDetails] = useState({
        firstName: '',
        lastName: '',
        eMail: '',
        pwd: '',
        confirmPwd: '',
    })

    const [formErrors, setformErrors] = useState({
        eMail: '',
        pwd: '',
        confirmPwd: ''
    })

    // const [showPwd, setShowPwd] = useState(false)

    const validateForm = () => {
        let validator = true
        // setShowPwd(false)
        const { eMail, pwd, confirmPwd } = userDetails

        const eMailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        const pwdValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (!eMailValidator.test(eMail)) {
            setformErrors(preValue => ({ ...preValue, eMail: 'Invalid e-Mail' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, eMail: '' }))
        }

        if (!pwdValidator.test(pwd)) {
            setformErrors(preValue => ({ ...preValue, pwd: 'Minimum 8 characters long and must contain a number' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, pwd: '' }))
        }


        if (pwd !== confirmPwd) {
            setformErrors(preValue => ({ ...preValue, confirmPwd: 'Passwords does not match' }))
            validator = false
        }
        else {
            setformErrors(preValue => ({ ...preValue, confirmPwd: '' }))
        }

        return validator
    }

    const signUpUser = async (event) => {
        event.preventDefault()
        if (validateForm()) {
            const response = await signUpHandler(userDetails)
            if (response.status === 201) {
                navigate('/videos')
            }
        }

    }
    return (
        <div className='signup'>

            <div className="signup-container">
                <form>
                    <div className='form-inputs'>
                        <label htmlFor="firstname">Firstname</label>
                        <input type="text" value={userDetails.firstName} onChange={(e) => setuserDetails(preValue => ({ ...preValue, firstName: e.target.value }))} />
                    </div>

                    <div className='form-inputs'>
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" placeholder='Optional' value={userDetails.lastName} onChange={(e) => setuserDetails(preValue => ({ ...preValue, lastName: e.target.value }))} />
                    </div>

                    <div className='form-inputs'>
                        <label htmlFor="e-mail">E-mail</label>
                        <input type="mail" value={userDetails.eMail} onChange={(e) => setuserDetails(preValue => ({ ...preValue, eMail: e.target.value }))} />
                        <span className='error'>{formErrors.eMail}</span>
                    </div>

                    <div className='form-inputs'>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={userDetails.pwd} onChange={(e) => setuserDetails(preValue => ({ ...preValue, pwd: e.target.value }))} />
                        <span className='error'>{formErrors.pwd}</span>
                    </div>

                    <div className='form-inputs'>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input type="password" value={userDetails.confirmPwd} onChange={(e) => setuserDetails(preValue => ({ ...preValue, confirmPwd: e.target.value }))} />
                        <span className='error'>{formErrors.confirmPwd}</span>
                    </div>

                    <div className='form-inputs'>
                        <button onClick={(e) => signUpUser(e)}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
