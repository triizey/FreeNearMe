import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import MyEvents from './pages/MyEvents';
import { firebase } from './firebase';
import EventContext from './utils/EventContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { outdatedFilter } from './components/dataFilter';

const App = () => {
  const [defaultEvents, setDefaultEvents] = useState([]);

  const [zipcode, setZipcode] = useState('94203');

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/api/events/defaultEvents');
      const updatedData = outdatedFilter(data);
      setDefaultEvents(updatedData);
      console.log(updatedData.length);
      console.log(updatedData);
    };
    fetchEvents();
  }, []);

  const SignInWithGoogle = () => {
    const google_provider = new firebase.auth.GoogleAuthProvider(); // creates a provider
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((res) => {
        console.log(res);
        if (!res.additionalUserInfo.profile.email.includes('.edu')) {
          setUser('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    if (email.includes('.edu')) {
      clearErrors();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case 'auth/invalid-email':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
              setEmailError(err.message);
              break;
            case 'auth/wrong-password':
              setPasswordError(err.message);
              break;
            default:
              setPasswordError(err.message);
          }
        });
    } else {
      setEmailError('email is not valid');
    }
  };

  const handleSignup = () => {
    if (email.includes('.edu')) {
      clearErrors();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message);
              break;
            case 'auth/weak-password':
              setPasswordError(err.message);
              break;
            default:
              setPasswordError(err.message);
          }
        });
    } else {
      setEmailError('email is not valid');
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // every time user logs in or signup then we have user so we want to clear the inputs and set the user
        console.log(user);
        if (!user.multiFactor.user.email.includes('.edu')) {
          setUser('');
          return;
        }
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  return (
    <EventContext.Provider value={{ defaultEvents }}>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/myEvents">
              <MyEvents events={defaultEvents} />
            </Route>
            <Route exact path="/">
              <Home handleLogout={handleLogout} events={defaultEvents} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </EventContext.Provider>
  );
};

export default App;
