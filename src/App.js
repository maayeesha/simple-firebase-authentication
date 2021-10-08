import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

function App() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleTwitterSignin = () => {
    signInWithPopup(auth, twitterProvider).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loggedInUser);
    });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  return (
    <div className="App">
      {!user.name ? (
        <div className="p-5">
          <Button variant="danger" className="m-3" onClick={handleGoogleSignin}>
            {" "}
            Sign In with Google{" "}
          </Button>
          <Button variant="info" onClick={handleTwitterSignin}>
            {" "}
            Sign In with Twitter{" "}
          </Button>
        </div>
      ) : (
        <Button variant="seondary" onClick={handleSignOut}>
          {" "}
          Sign Out{" "}
        </Button>
      )}

      <br />

      {user.email && (
        <div>
          <h1>User Info</h1>
          <h2>Welcome {user.name}</h2>
          <p>Email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
