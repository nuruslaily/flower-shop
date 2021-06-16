import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    // Redirect
} from "react-router-dom";
import App from './App';
import Signup from './Component/Signup';
import { connect } from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from './firebase/firebaseConfig';
// import HomeAdmin from './Component/homeAdmin';

class Main extends React.Component {
    constructor(props) {
        super(props)
    
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
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

    render() {
    return (
        <Router>
            <div>

            </div>

            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                {/* <Route path="/homeAdmin">
                    <HomeAdmin />
                </Route> */}
            </Switch>

        </Router>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);