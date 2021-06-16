import React, { Component } from 'react'
import { connect } from 'react-redux'

class homeUser extends Component {
    render() {
        return (
                <div className="homeUser">
                    <h1>Welcome {this.props.userEmail}</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(homeUser);