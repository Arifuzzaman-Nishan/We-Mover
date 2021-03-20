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
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            return user;
            // setLoggedInUser(user);
            // history.replace(from);
            // console.log(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage);
            // ...
        });
}


export const createUserWithEmailAndPassword = (email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
        return 'successfully';

        // const info = { ...message };
        // info.success = 'successfully created account';
        // setMessage(info);
        // updateUserName(name);
    })
    .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        return errorMessage;
        // const info = { ...message };
        // info.error = errorMessage;
        // setMessage(info);
        // console.log(errorCode, errorMessage);
        // ..
    });
}

export const updateUserName = (name) =>{
    const user = firebase.auth().currentUser;
    return user;
}


export const signInWithEmailAndPassword = (email,password) => {
     return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        return user;
        
        // setLoggedInUser(user);
        // console.log('successfully log in');
        // const info = { ...message };
        // info.success = 'successfully log in';
        // setMessage(info);

        // history.replace(from);
    })
    .catch((error) => {
        // var errorCode = error.code;
        const errorMessage = error.message;
        
        return errorMessage;
        // const info = { ...message };
        // info.error = errorMessage;
        // setMessage(info);
        // console.log(errorCode, errorMessage);
    });
}


//         }


