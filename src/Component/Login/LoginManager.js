import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confiq';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            // The signed-in user info.
            var user = result.user;
            return user;
        }).catch((error) => {
           
        });
}


export const createUserWithEmailAndPassword = (email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
        return 'successfully';

    })
    .catch((error) => {
        var errorMessage = error.message;
        return errorMessage;
    });
}

export const updateUserName = (name) =>{
    const user = firebase.auth().currentUser;
    return user;
}


export const signInWithEmailAndPassword = (email,password) => {
     return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
        const user = userCredential.user;
        return user;
    })
    .catch((error) => {
        const errorMessage = error.message;
        
        return errorMessage;
    });
}



