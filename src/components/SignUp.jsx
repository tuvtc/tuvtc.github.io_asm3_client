// import du lieu va css
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import api from "../api/api"

// Component Sign up
function SignUp() {
  const [fullName, setInputName] = React.useState('')
  const [email, setInputEmail] = React.useState('')
  const [password, setInputPassword] = React.useState('')
  const [phoneNumber, setInputPhone] = React.useState('')
  const navigate = useNavigate();


  // Lay du lieu
  const updateName = (e) => {
    setInputName(e.target.value)
  }
  const updateEmail = (e) => {
    setInputEmail(e.target.value)
  }
  const updatePassword = (e) => {
    setInputPassword(e.target.value)
  }
  const updatePhone = (e) => {
    setInputPhone(e.target.value)
  }

  const onCreateAcc = async () => {
    try {
      await api.signup({email, password, fullName, phoneNumber })
      navigate('/login')
      clearInput()
    } catch (e) {
      if (Array.isArray(e.response?.data?.message)) {
        alert(e.response?.data?.message[0])
      } else {
        alert(e.response?.data?.message)
      }
    }
  }
  
  // Clear du lieu
  const clearInput = () => {
    setInputName('')
    setInputEmail('')
    setInputPassword('')
    setInputPhone('')
  }

  // Render du lieu
  return (
    <div className="d-flex justify-content-center pt-5">
      <div className="card" style={{ width: "36rem" }}>
        <div className="card-body">
          <p className="my-5 text-center fs-1 fst-italic">Sign Up</p>
          <div className="d-flex flex-column w-50 m-auto ">
            <div className="d-flex flex-column sign-form">
              <input value={fullName} onChange={updateName} className="border-0 p-3" type="text" placeholder="Full Name" />
              <input value={email} onChange={updateEmail} className="border-0 p-3" type="email" placeholder="Email" />
              <input value={password} onChange={updatePassword}
                className="border-0 p-3"
                type="password"
                placeholder="Password"
              />
              <input value={phoneNumber} onChange={updatePhone} className="border-0 p-3" type="phone" placeholder="Phone" />
            </div>
            <button onClick={onCreateAcc} className='my-4 btn btn-dark sign-btn p-3'>SIGN UP</button>
            <p className="text-center my-3 text-body-tertiary fst-italic fs-5">
              <span>Login? </span>
              <span className='link-signin' onClick={() => navigate('/signup')}>Click</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
