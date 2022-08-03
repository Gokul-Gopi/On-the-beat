import React, { useState } from "react";
import "../SignUp/SignUp.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import callToastify from "../../components/Toast/toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUpHandler } = useAuth();
  const [userDetails, setuserDetails] = useState({
    firstName: "",
    lastName: "",
    eMail: "",
    pwd: "",
    confirmPwd: "",
  });

  const [formErrors, setformErrors] = useState({
    firstName: "",
    lastName: "",
    eMail: "",
    pwd: "",
    confirmPwd: "",
  });

  const validateForm = () => {
    let validator = true;
    const { eMail, pwd, confirmPwd, firstName, lastName } = userDetails;

    const eMailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const pwdValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!firstName) {
      setformErrors((preValue) => ({
        ...preValue,
        firstName: "Firstname is required",
      }));
      validator = false;
    } else {
      setformErrors((preValue) => ({ ...preValue, firstName: "" }));
    }

    if (!lastName) {
      setformErrors((preValue) => ({
        ...preValue,
        lastName: "Lastname is required",
      }));
      validator = false;
    } else {
      setformErrors((preValue) => ({ ...preValue, lastName: "" }));
    }

    if (!eMailValidator.test(eMail)) {
      setformErrors((preValue) => ({ ...preValue, eMail: "Invalid e-Mail" }));
      validator = false;
    } else {
      setformErrors((preValue) => ({ ...preValue, eMail: "" }));
    }

    if (!pwdValidator.test(pwd)) {
      setformErrors((preValue) => ({
        ...preValue,
        pwd: "Minimum 8 characters long and must contain a number",
      }));
      validator = false;
    } else {
      setformErrors((preValue) => ({ ...preValue, pwd: "" }));
    }

    if (pwd !== confirmPwd) {
      setformErrors((preValue) => ({
        ...preValue,
        confirmPwd: "Passwords does not match",
      }));
      validator = false;
    } else {
      setformErrors((preValue) => ({ ...preValue, confirmPwd: "" }));
    }

    return validator;
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const response = await signUpHandler(userDetails);
      if (response.status === 201) {
        callToastify("Welcome!", true);
        navigate("/videos");
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="heading">
          <h2>On the beat!</h2>
        </div>
        <form>
          <div className="form-input-parent">
            <div className="form-inputs">
              <FaRegUserCircle />
              <input
                type="text"
                value={userDetails.firstName}
                placeholder="Firstname"
                onChange={(e) =>
                  setuserDetails((preValue) => ({
                    ...preValue,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <span className="error">{formErrors.firstName}</span>
          </div>

          <div className="form-input-parent">
            <div className="form-inputs">
              <FaRegUserCircle />
              <input
                type="text"
                value={userDetails.lastName}
                placeholder="Lastname"
                onChange={(e) =>
                  setuserDetails((preValue) => ({
                    ...preValue,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
            <span className="error">{formErrors.lastName}</span>
          </div>

          <div className="form-input-parent">
            <div className="form-inputs">
              <FiMail />
              <input
                type="mail"
                value={userDetails.eMail}
                placeholder="e-Mail"
                onChange={(e) =>
                  setuserDetails((preValue) => ({
                    ...preValue,
                    eMail: e.target.value,
                  }))
                }
              />
            </div>
            <span className="error">{formErrors.eMail}</span>
          </div>

          <div className="form-input-parent">
            <div className="form-inputs">
              <RiLockPasswordLine />
              <input
                type="password"
                value={userDetails.pwd}
                placeholder="Password"
                onChange={(e) =>
                  setuserDetails((preValue) => ({
                    ...preValue,
                    pwd: e.target.value,
                  }))
                }
              />
            </div>
            <span className="error">{formErrors.pwd}</span>
          </div>

          <div className="form-input-parent">
            <div className="form-inputs">
              <RiLockPasswordLine />
              <input
                type="password"
                value={userDetails.confirmPwd}
                placeholder="Confirm Password"
                onChange={(e) =>
                  setuserDetails((preValue) => ({
                    ...preValue,
                    confirmPwd: e.target.value,
                  }))
                }
              />
            </div>

            <span className="error">{formErrors.confirmPwd}</span>
          </div>

          <div className="sign-up-btn">
            <button onClick={(e) => signUpUser(e)}>Sign Up</button>
            <span>
              Already have an account?
              <Link to="/login">
                <strong> Login</strong>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
