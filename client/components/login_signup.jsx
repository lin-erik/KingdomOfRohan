import React from 'react'

class Login_Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoginPage: true
        }
    }




    render() {
        if (this.state.showLoginPage) {
            return(
                <div>
                    <h2>Welcome to Moodvie</h2>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default Login_Signup