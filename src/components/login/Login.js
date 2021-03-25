import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Login extends React.Component {
  /**
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor given by username & name
   */
  constructor(props) {
    super(props);
    // Initial state is given
    this.state = {
      name: null,
      username: null,
    };
  }
  /**
   * After the user field out both username & password field and clicks on the login button -> login() is invoked
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end form of (UserGetDTO)
   * It's token, id, username & name is stored in the local storage
   */
  async login() {
    try {
      // What we send back to the backend
      const requestBody = JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password
      });
      // We create a Put Request to the backend to /login
      const response = await api.put('/login', requestBody);

      // Get the returned user and update a new object (UserGetDTO)
      const user = new User(response.data);

      // Store the token, the username,id, token and name into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);
      localStorage.setItem('name',user.name);
      
      // This part is for the navigationbar-> Calls the changeNavState in the Parent -> AppRouter
      this.props.callParent(this.props.changeNavState);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      // Otherwise an error is displayed
      this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
      <h3 className="center white-text">Login</h3>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            {/* This is the first inputField, that will invoke handleInputChange(), whenever something is written inside it */}
            <InputField
              placeholder="Please enter your username here..."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Password</Label>
            {/* This is the second inputField, that will invoke handleInputChange(), whenever something is written inside it */}
            <InputField type="password"
              placeholder="Please enter the password here"
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            <ButtonContainer>
              {/* A check is first done, before the user can submit the login and login() is invoked -> username&password fields cannot be empty */}
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login 
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
