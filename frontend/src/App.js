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
import Details from './pages/Details';
import Zipcode from './pages/Zipcode';
//import { handleGeoCodes } from './utils/firebaseUtils';
//import useFirestore from './customHooks/useFirestore';

const App = () => {
  const [events, setEvents] = useState([]);
  const [defaultEvents, setDefaultEvents] = useState([]);
  //const geoCodes = useFirestore('eventlocations');

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('/api/events');
      const updatedData = outdatedFilter(data);
      setEvents(updatedData); //315
    };
    fetchEvents();
  }, []);

  // useEffect(() => {
  //   events.forEach((event) => {
  //     handleGeoCodes(event);
  //   });
  // }, [events]);

  useEffect(() => {
    const fetchDefaultEvents = async () => {
      const { data } = await axios.get('/api/events/defaultEvents');
      const updatedData = outdatedFilter(data);
      setDefaultEvents(updatedData); // 38
      console.log(updatedData);
    };

    fetchDefaultEvents();
  }, []);

  const SignInWithGoogle = () => {
    const google_provider = new firebase.auth.GoogleAuthProvider(); // creates a provider
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((res) => {
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

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

  useEffect(() => {
    authListener();
  });

  return (
    <EventContext.Provider value={{ events }}>
      <Router>
        <Header user={user} />
        <div>
          <Switch>
            <Route path="/zipcode/:id">
              <Zipcode events={events} />
            </Route>
            <Route path="/myEvents">
              <MyEvents events={events} />
            </Route>
            <Route exact path="/SignIn">
              <SignIn
                user={user}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
                SignInWithGoogle={SignInWithGoogle}
              />
            </Route>
            <Route exact path="/">
              <Home events={events} defaultEvents={defaultEvents} />
            </Route>
            <Route
              path="/events/:uuid"
              render={(props) => <Details {...props} />}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </EventContext.Provider>
  );
};

export default App;
