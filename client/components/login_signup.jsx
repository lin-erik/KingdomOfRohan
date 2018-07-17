import React from 'react'

class Login_Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoginPage: true
        }
        this.handleSignupToggle = this.handleSignupToggle.bind(this)
    }

    handleSignupToggle () {
        let current = this.state.showLoginPage
        this.setState({
            showLoginPage: !current
        })
    }




    render() {
        if (this.state.showLoginPage) {
            return(
                <div>
                    <h2>Welcome to Moodvie</h2>
                    <h3>Login</h3>
                    <div className="login-container">
                        <div className="username-container">
                            <span>Username: </span><input type="text" />
                        </div>
                        <div className="password-container">
                            <span>Password: </span><input type="text" />
                        </div>
                    </div>


                    <div className= "button-container">
                        <button>Login</button>
                        <button>Sign Up Page</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Create a New Account</h3>
                    <div className="signup-container">
                        <div className="username-container">
                            <span>Username: </span><input type="text" />
                        </div>
                        <div className="password-container">
                            <span>Password: </span><input type="text" />
                        </div>
                    </div>

                    <div className= "button-container">
                        <button>Sign Up Now!</button>
                        <button>Already Have an Account?</button>
                    </div>
                </div>
            )
        }
    }
}

export default Login_Signup