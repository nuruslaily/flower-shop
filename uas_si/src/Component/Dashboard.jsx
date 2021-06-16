import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    // Redirect
} from "react-router-dom";
import firebaseConfig from '../firebase/firebaseConfig';
import firebase from 'firebase';
import HomeAdmin from './homeAdmin';
import Signup from './Signup';
import ProdukAdmin from './ProdukAdmin';

export default class dashboard extends Component {

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

                console.log("User adalah : " + user.email)
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

    componentDidMount() {
        this.authListener();
    }

    logout() {
        firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        // this.props.router.push('/homeAdmin');
        return (
            <Router>
                <div className="dashboard">
                    <div className="sidebar">
                        <center><h1>Flower Shop</h1></center>
                        <ul>
                            <li><Link to="/homeAdmin"><i className="fa fa-home" /> Home</Link></li>
                            <li><Link to="/dataProduk"><img src="https://image.flaticon.com/icons/png/512/812/812277.png" alt="tulip" /> Data Produk</Link></li>
                            <li><Link to="/dataUser"><i className="fa fa-user" />Data User</Link></li>
                        </ul>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/homeAdmin">
                                <HomeAdmin />
                            </Route>
                            <Route path="/dataProduk">
                                <ProdukAdmin />
                            </Route>
                            <Route path="/dataUser">
                                <Signup />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
