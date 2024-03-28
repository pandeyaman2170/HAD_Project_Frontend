import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './GlobalAdminNavbar';
import './globalAdminLogin.css'
import axios from 'axios';

const GlobalAdminLogin = (props) => {
  let GlobalAdminJwtToken;
  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [userNameError, setuserNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setuserNameError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === userName) {
        setuserNameError('Please enter your userName')
        return
    }

    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userName)) {
    //     setuserNameError('Please enter a valid userName')
    //     return
    // }

    if ('' === password) {
        setPasswordError('Please enter a password')
        return
    }

    axios.post(`http://localhost:8090/global_admin/login`, {
        username: userName,
        password: password
      }).then((response => {
        GlobalAdminJwtToken = response.data.jwtToken
        axios.defaults.headers.common["Authorization"] = `Bearer ${GlobalAdminJwtToken}`
        localStorage.setItem("jwtToken", GlobalAdminJwtToken)
        fetchPtDetail();
        navigate('/global_admin/dashboard');
        // console.log(localStorage.getItem("jwtToken"));
      })).catch((e) => console.log(e))

    // if (password.length < 7) {
    //     setPasswordError('The password must be 8 characters or longer')
    //     return
    // }

     // Check if userName has an account associated with it
    // checkAccountExists((accountExists) => {
    // // If yes, log in
    //     if (accountExists) logIn()
    //     // Else, ask user if they want to create a new account and if yes, then log in
    //     else if (
    //     window.confirm(
    //         'An account does not exist with this userName address: ' + userName + '. Do you want to create a new account?',
    //     )
    //     ) {
    //     logIn()
    //     }
    // })

  }

  const fetchPtDetail = async () => {
    const token=localStorage.getItem("jwtToken");
    console.log(" GlobalAdminJwtToken: "+token);
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
    await axios.get(`http://localhost:8090/global_admin/getGlobalAdminDetails/${userName}`)
      .then((response) => {
        console.log( response.data)
        localStorage.setItem("globalAdminDetails", JSON.stringify(response.data))
        console.log("Ptresponsedata", response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

//   const checkAccountExists = (callback) => {
//   }

  // Log in a user using userName and password
// const logIn = () => {
//     fetch('http://localhost:3080/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userName, password }),
//     })
//       .then((r) => r.json())
//       .then((r) => {
//         if ('success' === r.message) {
//           localStorage.setItem('user', JSON.stringify({ userName, token: r.token }))
//           props.setLoggedIn(true)
//           props.setuserName(userName)
          
//         } else {
//           window.alert('Wrong userName or password')
//         }
//       })
//   }

  useEffect(() => {
  }, [])

  return (
    <>
    <AdminNavbar />
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Global Admin Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={userName}
          placeholder="Enter your username here"
          onChange={(ev) => setuserName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{userNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
    </>
  )
}

export default GlobalAdminLogin