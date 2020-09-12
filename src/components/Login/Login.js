import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework,handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {

  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignIn: false,
    name:'',
    email:'',
    password:'',
    photo:''

  })
  initializeLoginFramework();

  const [userLoggedIn,setUserLoggedIn] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setUserLoggedIn(res);
      history.replace(from);
    })
  }

  const SignOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setUserLoggedIn(res);
    })
  }
 
const handleBlur = (e) => {
  let isFieldValid = true;
  if(e.target.name === 'email'){
    isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value);
   
  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length > 6;
    const isPasswordHasNumber = /\d{1}/.test(e.target.value);
     isFieldValid= isPasswordValid && isPasswordHasNumber;
  }
  if(isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
}
const handleSubmit = (e) => {
  if(newUser && user.email && user.password){

    createUserWithEmailAndPassword(user.name,user.email,user.password)
    .then(res => {
      setUser(res);
      setUserLoggedIn(res);
      history.replace(from);
    })
    
  }
  if(!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email,user.password)
    .then(res => {
        setUser(res);
        setUserLoggedIn(res);
        history.replace(from);
    })
  }

  e.preventDefault();
}
 

  return (
    <div style={{textAlign:'center'}}>
   {
      user.isSignIn ? <button onClick={SignOut}>Sign-Out</button> : 
      <button onClick={GoogleSignIn}>Sign-in</button>

   }
      
    
      {
        user.isSignIn && <div>
          <p>Welcome,{user.name} </p>
          <p>Your email {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">NewUser sign-up</label>
  
      <form onSubmit={handleSubmit}>        
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
        <br/>
        <input type="submit" value={newUser ? 'Sign up': 'Sign in'}/>
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style = {{color:'green'}}>User {newUser ?'created' : 'Logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
