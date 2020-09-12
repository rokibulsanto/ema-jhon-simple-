import * as firebase from "firebase/app";
import "firebase/auth";
import { configure } from '@testing-library/react';
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signInUser = {

        isSignIn: true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true

      }
      return signInUser;
      
     
    })
    .catch(err =>{
      console.log(err);
    })
  }

  export const handleSignOut = ()=> {
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignIn: false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success:false

      }
      return signOutUser;
    })
    .catch(err => {
      console.log(err);
    })
  }

  export const createUserWithEmailAndPassword = (name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
      
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error =error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email,password)=> {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {};
        newUserInfo.error =error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('userName update successfully');
    }).catch(function(error) {
      console.log(error);
    });
} 