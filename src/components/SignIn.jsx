// import du lieu va css
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/auth'
import api from '../api/api'
import Cookies from 'universal-cookie';


// Component Sign In
function SignIn() {

  const dispatch = useDispatch()

  const cookies = new Cookies();
  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  // Lay du lieu duoc nhap vao
  const updateEmail = (e) => {
    setEmail(e.target.value)
  }
  const updatePassword = (e) => {
    setPassword(e.target.value)
  }
  // Valid du lieu
  
  const onLogin = async () => {
    try {
      const response = await api.login({email, password})
      cookies.set('userLogin', response.data.user, { path: '/' });
      cookies.set('token', response.data.token, { path: '/' });
      dispatch(authActions.ON_LOGIN(response.data.user))
      navigate('/')
      clearAll()
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }

  // Clear du lieu
  const clearAll = () => {
    setEmail('')
    setPassword('')
  }

  // Qua trang signup
  const linkToSignUp = () => {
    navigate("/signup")
  }

  // render du lieu o Sign in
  return (
    <div className="d-flex justify-content-center pt-5">
      <div className="card" style={{ width: "36rem" }}>
        <div className="card-body ">
          <p className="my-5 text-center fs-1 fst-italic">Sign In</p>
          <div className="d-flex flex-column w-50 m-auto ">
            <div className="d-flex flex-column sign-form">
              <input value={email} onChange={updateEmail} className="border p-3" type="email" placeholder="Email" />
              <input
                value={password}
                onChange={updatePassword}
                className="border p-3"
                type="password"
                placeholder="Password"
              />
            </div>
            <button onClick={onLogin} className='my-4 btn btn-dark sign-btn p-3'>SIGN IN</button>
            <p className="text-center my-3 text-body-tertiary fst-italic fs-5">
              <span>Create an account? </span>
              <span className='link-signup' onClick={linkToSignUp}>Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
