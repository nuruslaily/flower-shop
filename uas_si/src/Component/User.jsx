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
import '../App.css'
import HomeUser from './homeUser';
import Keranjang from './Keranjang';
import ProdukUser from './ProdukUser';

export default class User extends Component {

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
        return (
            <Router>
                <div className="User">
                    <div className="header">
                        <h1>Flower Shop</h1>
                        <ul>
                            <li><Link to="/homeUser">Home</Link></li>
                            <li style={{marginLeft:"-2.5vw"}}><Link to="/listBunga">List Bunga</Link></li>
                            <li><Link to="/keranjang">Keranjang</Link></li>
                        </ul>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/homeUser">
                                <HomeUser />
                            </Route>
                            <Route path="/listBunga">
                                <ProdukUser />
                            </Route>
                            <Route path="/keranjang">
                                <Keranjang />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
