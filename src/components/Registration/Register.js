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


class Register extends React.Component {
  /**
   * The constructor for a React component is called before it is mounted (rendered).
   */
  constructor() {
    super();
    // Here the state get's defined 
    this.state = {
      name: null,
      username: null,
      password: null,
      birthday: null
    };
  }
  /**
   * After all fields have been filled out and the user clicks on register, the function register() gets invoked
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end in a UserGetDTO maner
   * and its token,id,username and name is stored in the localStorage.
   */
  async register() {
    try {
      // What we want to send back to the backend
      const requestBody = JSON.stringify({
        username: this.state.username.toLowerCase(),
        name: this.state.name,
        password: this.state.password,
        birthday: this.state.birthday
      });
      // Post request to the backend with given data
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token, id, username & name into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);
      localStorage.setItem('name',user.name);
    
      // This is for the navigation bar -> Calls changeNavState in the parent
      this.props.callParent(this.props.changeNavState);


      // Login successfully worked --> navigate to the route /game in the GameRouter,
      // If something went wrong send the user back to the registration
      this.props.history.push(`/game`);
    } catch (error) {
      this.props.history.push("/registration")
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
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
        <h3 className="center white-text">Register</h3>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            {/* This is the first inputField, that will invoke handleInputChange(), whenever something is written inside it */}
            <InputField
              placeholder="Pleasse enter your username here..."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Name</Label>
            {/* This is the second inputField, that will invoke handleInputChange(), whenever something is written inside it */}
            <InputField
              placeholder="Please enter the name here..."
              onChange={e => {
                this.handleInputChange('name', e.target.value);
              }}
            />
            <Label>Password</Label>
            {/* This is the third inputField, that will invoke handleInputChange(), whenever something is written inside it */}
            <InputField type="password"
              placeholder="Please enter the password here..."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />

            <ButtonContainer>
            {/* A check is first done, before the user can submit the register info and register() is invoked -> fields cannot be empty & password cannot be shorter than 5 char */}
              <Button
                disabled={!this.state.username || !this.state.name || !this.state.password || this.state.password.length<5}
                width="50%"
                onClick={() => {
                  this.register();
                }}
              >
                Create Account 
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
export default withRouter(Register);
