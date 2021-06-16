import React, { Component } from 'react'
import './App.css';
import firebase from 'firebase';
import firebaseConfig from './firebase/firebaseConfig';
// import Signup from './Component/Signup';
import Dashboard from './Component/Dashboard';
import { connect } from 'react-redux';
import User from './Component/User';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "",
      password: "",
      user: {}
    }
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        })

        this.props.handleUser(user.email);
        console.log("User adalah : " + user.email)
      }
      else {
        this.setState({
          user: null
        })
        this.props.handleUser(null);
      }
    })
  }

  componentDidMount() {
    this.authListener();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
      if(this.state.email==="admin@gmail.com"){
        this.props.history.push("/homeAdmin")
      } else{
        this.props.history.push("/homeUser")
      }
    }).catch((err) => {
      console.log(err);
      alert(err);
      this.setState({
        email: '',
        password: ''
      })
    })
  }

  logout() {
    firebase.auth().signOut();
    window.location.reload();
  }

  render() {
    return this.state.user ? (
      <div>
        {/* <button onClick={this.logout}>Logout</button> */}
        <HandleCekUser user={this.props.userEmail}/>
      </div>
    ) : (
      <div className="Login">
        <div className="card-login">
          <h1>Login</h1>
          <p id="t-login-1">Email*</p>
          <input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter your email" />
          <p id="t-login-2">Password*</p>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter your password" /><br />
          <button onClick={this.login}>Login</button>
          <a href="/signup" id="btn-signup">Create an Account ?</a>
        </div>
      </div>
    )
  }
}

const HandleCekUser = (usr) => {
  console.log(usr);
  if (usr.user === "admin@gmail.com") {
    // console.log('masuk');
    return <Dashboard />;
  } else {
    console.log('masuk');
    return <User />
  }
}


const mapStateToProps = (state) => {
  return {
      userEmail: state.userEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleUser: (cek) => dispatch({ type: 'ADD_USER', newValue: cek })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

