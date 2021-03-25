import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Profilepage from '../profilepage/Profilepage';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;

class Game extends React.Component {
  constructor() {
    super();
    // In the Constructor, we set the state users, wich refers to all users we get from the backend
    this.state = {
      users: null,
    };
  }

  /*
  * This function get's called immediately after the component gets mounted. 
  * This needs to be done for the GET Request to the backend, that we can retrieve all of our Users.
  */
  async componentDidMount() {
    try {
      // GET Request to /users, where we retreive all of our Users
      const response = await api.get('/users');
   
      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // If something goes wrong -> Display an error
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  /*
  * This function does the logic, when the user logs out.
  */
  async logout() {
    // Getting the userId, needed for the backend
    const id = localStorage.getItem('id');
    // Then we clear the local Storage
    localStorage.clear();
    // Declare, what we want to have sent to the backend
    const requestBody = JSON.stringify({
      username: null,
      password: null,
      id: id
    });
    // We are going to wait for the put to the backend
    await api.put("/logout",requestBody);

    // This is for the Navigation Bar
    this.props.callParent(this.props.changeNavState);

    // We send the user to the login screen -> loged out
    this.props.history.push('/login');
  }

  render() {
    return (
      <Container>
        <h2>Hello {localStorage.getItem("name")}</h2>
        <p>Get all users from secure end point:</p>
        {/* If no users we display a Spinner, else we display the UserOverview */}
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {/* Here we map through our users and display them on the OverviewPage in the form defined in Players */}
              {this.state.users.map(user => {
                return (
                  <ButtonContainer
                      onClick = {() => {
                        this.props.history.push(`/profilepage/${user.id}`)
                      }}
                    >
                  <PlayerContainer key={user.id}>
                    <Player user={user} />
                  </PlayerContainer>
                </ButtonContainer>
                );
              })}
            </Users>
            {/* This is a logout button */}
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
