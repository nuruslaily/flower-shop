import React, { Component } from 'react'
import { connect } from 'react-redux';
import Foto from './flowers.jpeg';

class homeAdmin extends Component {
    render() {
        return (
                <div className="homeAdmin">
                    <h1>Welcome {this.props.userEmail}</h1>
                    <br/>
                    <br />
                    <img src={Foto} alt="gambar"/>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(homeAdmin);