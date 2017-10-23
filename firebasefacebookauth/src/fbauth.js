import React from 'react'
import firebase from 'firebase';
import FacebookLogin from 'react-facebook-login';

export class FBAuth extends React.Component{
    constructor(props)
    {
        super(props);

        this.state = {userSignedIn: false, fbReAuthenticate: true };
        
        var config = {
            apiKey: "<FIREBASE_API_KEY>",
            authDomain: "FIREBASE_AUTH_DOMAIN_URL",
            databaseURL: "FIREBASE_REALTIME_DATABASE_URL",
            projectId: "FIREBASE_PROJECTID",
            storageBucket: "FIREBASE_STORAGEBUCKET_ID",
            messagingSenderId: "FIREBASE_MESSAGINGSENDERID"
        };
        firebase.initializeApp(config);
    }

    //This will be the CAllBACK that would get invoked after authentication from Facebook
    responseFacebook = (response) => {
        
        //Validate if it has a valid accessToken
        if (response.accessToken)
        {            
            console.log(response);
            console.log(response.accessToken);

            // Build Firebase credential with the Facebook access token.
            var credential = firebase.auth.FacebookAuthProvider.credential(response.accessToken);
    
               // Sign in with credential from the Google generated based on the Facebook Auth Token.
               firebase.auth().signInWithCredential(credential).then((user) => {
                    
                    if (user) {
                        // User has successfully signed in.
                       // alert('user logged in successfully - 1'); 
                        this.setState ({userSignedIn: true});
                      } else {
                        // No user is signed in.
                        alert('user didnt sign in');
                      }                    
               })               
               .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    alert(errorCode + ' ' + errorMessage);
           });
        }
     
    }

    //To handle the SignOut functionality
    SignOutFromFireBase(e)
    {
        firebase.auth().signOut().then(() =>
        {
           // alert('user successfully signed out')
            this.setState({userSignedIn: false});
        }
        ).catch((error) => {
            alert('error during signout - ' + error.code + ' ' + error.message);
        });
    }


    render()
    {

        let status ;
        // alert(this.state.userSignedIn);
         if (this.state.userSignedIn)
             status = 'user signed in'
         else
            status = '';
        return (
            <div> 
                <FacebookLogin
                    appId="FACEBOOK_APPID_GOES_HERE"
                    autoLoad={false} 
                    fields="name,email,picture"
                    callback={(e) => this.responseFacebook(e) } 
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                    reAuthenticate = {this.state.fbReAuthenticate}
                />
                <button onClick = { (e) => this.SignOutFromFireBase(e) } > Sign Out </button>
                <p/>
                    {status }         
                <div> 

                </div>
            </div>
        )
    }
}