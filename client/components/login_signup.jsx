import React from 'react'

class Login_Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoginPage: true,
            username: '',
            password: ''
        }
        this.handleSignupToggle = this.handleSignupToggle.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleSignupToggle () {
        let current = this.state.showLoginPage
        this.setState({
            showLoginPage: !current
        })
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }




    render() {
        if (this.state.showLoginPage) {
            return(
                <div>
                    <h2>Welcome to Moodvie</h2>
                    <h3>Login</h3>
                    <div className="login-container">
                        <div className="username-container" onChange = {this.handleUsernameChange} >
                            <span>Username: </span><input type="text" />
                        </div>
                        <div className="password-container" onChange = {this.handlePasswordChange}>
                            <span>Password: </span><input type="text" />
                        </div>
                    </div>


                    <div className= "button-container">
                        <button onClick = {() => {
                            let un = this.state.username;
                            let pw = this.state.password;
                            this.props.login(un, pw)}} 
                            >Login</button>
                        <button onClick= {this.handleSignupToggle} >Sign Up Page</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Create a New Account</h3>
                    <div className="signup-container">
                        <div className="username-container" onChange = {this.handleUsernameChange}>
                            <span>Username: </span><input type="text" />
                        </div>
                        <div className="password-container" onChange = {this.handlePasswordChange}>
                            <span>Password: </span><input type="text" />
                        </div>
                    </div>

                    <div className= "button-container">
                        <button onClick ={() => {
                            let un = this.state.username;
                            let pw = this.state.password;
                            this.props.signup(un, pw)}} 
                            >Sign Up Now!</button> <br/>
                        <button onClick= {this.handleSignupToggle} >Already Have an Account?</button>
                    </div>
                </div>
            )
        }
    }
}

export default Login_Signup