import React from "react";
import styled from "styled-components";
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../../views/design/Spinner';

 

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width: 300px;
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

const Users = styled.ul`
  list-style: square;
  padding-left: 0;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Global variables I created, as I had problems getting them to work
// id, which is the id of the user 
// userdata, which is the userdata
let id = 0;
let userdata = null;

/**
   * The constructor for a React component is called before it is mounted (rendered).
   */
class Profilepage extends React.Component{
// Creating a constructor
constructor(props) {
  super(props);
  // getUserProfile() is called, before the component is mounted
  this.getUserProfile();
  // The state is defined by users -> the data of the users & ownProf an indicator, if the page is in edit mode or not
  // The id get's stored as well in the state -> retrieved from local storage
  this.state = {
    users: null,
    ownProf: false,
    id: localStorage.getItem("id")
  }
}

/*
* This get's called before the component mounts and
* for the Navbar, when we change from another profile to our own profile (click on Avatar)
* We mainly need it to get the information of the user.
* This is a GET request to users/{userID} to retreive the user!
*/
async getUserProfile() {
  try {
      // Gets the userID by URL in parent 
      this.id = this.props.match.params.id;
      //Get mapping to backend -> Expect JSON data in form of GetDTO
      const response = await api.get("/users/" + this.id)

      await new Promise(resolve => setTimeout(resolve, 1000));
      // Set the response data in our global variable -> userdata
      this.userdata = response.data;
      // Sets the state-> Assining the data to the users
      this.setState({ users: response.data });

    // If something goes wrong it gives us an error
  } catch (error) {
    alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
  }
}


/*
* This function is there for updating a user. It is a PUT Request to the backend, that does not 
* get any data back.
* It get's invoked, whenever we save the changes. So, if we change the username or the birthday of the user.
*/
async updateUser(){
  try {
    // What we send back to the backend
    const requestBody = JSON.stringify({
      username: this.state.users.username.toLowerCase(),
      birthday: this.state.users.birthday,
      id: this.state.users.id
    });

    const response = await api.put('/users/'+ this.id, requestBody);
    
    // If we do not get any response Data (noContent) we set the State
    if(response.status == 204){
    // As we have no Response from the Server (with data), we set the state again -> We set it to the previous State, that has been updated in handleInputChange
    // We also make sure to set ownProf = false again, that
     this.setState(prevState => ({
       users: {
     ...prevState.users
      },
      ownProf: false
      }))
    }
    // Otherwise we display an error
} catch (error) {
  alert(`Something went wrong during the registration: \n${handleError(error)}`);
}
}


// This function rerenders/updates the component, whenever the pathname is changed 
// Meaning whenever we are in some Profile page and want to change to our own for example -> Mainly for Navbar clicking the 
// Avatar icon
componentDidUpdate(prevProps) {
  if (this.props.location.pathname !== prevProps.location.pathname) {
  this.getUserProfile();}
  }

  /*
  * These are different functions, that handle certain Actions:
  *
  * handleBack(): This one is invoked, whenever someone clicks on the "Back to Overview Button", that is displayed on every profile
  * handleClick(): This handles the action, whenever a user is on his own profile and clicks on the edit button
  * handleInputChange(): Handles the changing of the data, whenever a user clicked on edit and changed the input
  * handleCancelClick(): This handels the action after clicking on the edit Button and the Cancel Button
  * handleSaveClick(): Handles the action after the user clicked on edit, edited his profile and saves.
  * 
*/ 

// Function 1: handleBack() -> Returns the user to the overview page
  handleBack = () =>{
    this.props.history.push("/game");
  }

// Function 2: handleClick
// When the user is on his own profile and clicks on the edit button -> ownProf is set to true enabling him to edit the username & birthday
handleClick = (e) => {
  e.preventDefault();
  this.setState({
    ownProf: true
  })
 };

 // Function 3: handleInputchange()
 // By changing the data inside the text fields, we update the previousState with the new one
 handleInputChange(key, value) {
  // Copy previous state copy and update it.
  this.setState(prevState => ({
    users: {
    ...prevState.users,
    [key]: value
    }
    }))
}
// Function 4: handelCancelClick()
// Whenever the user clicks on cancel, we want to get back to our previous state, before the user typed in something
// For this we use the userdata, that we received from getUserProfile in the beginning, as it contains still the old entries.
handleCancelClick = (e) => {
  e.preventDefault();
  this.setState({
  ownProf: false
  })
  this.setState(prevState => ({
    users: {
    ...prevState.users,
    username: this.userdata.username,
    birthday: this.userdata.birthday
    }
    }))
  }


// Function 5: handleSaveClick()
// This function get's invoked, whenever the user clicks on the Edit Button changes the settings and edits them
// If the username is not empty it will call updateUser() -> Which will send the information to the backend.
handleSaveClick = (e)=>{
  e.preventDefault();
  // Checks, that the username is not empty
  if(this.state.users.username.trim()== ""){
    alert("You cannot have an empty username!")
  }else{
    this.updateUser();
  }
}


render(){
  // We need the id of the current user and the one of the Userprofile -> 
  // This will be needed to check if we can display the Edit Button on the Profilepage or not
  const id = this.props.match.params.id;
  const idUser = localStorage.getItem("id");
    return ( 
        <Container>
          {/* If we did not receive a User, then a Spinner is displayed, else the profile Page */}
            <h2>Profile</h2> 
            {!this.state.users ? (
                  <Spinner/>
              ) : (
            <div>
                <div className="card">
                    <div></div>
                    <div className="btn-large pink">{this.state.users.username}</div>
                    {/* Here comes the card content*/}
                    <div className="card-content">
                        <span className="card-title blue-text">Userprofile</span>
                        <section className="section container">
                            <form action="">
                                <Label> <label htmlFor="2">Your Username</label>
                                <br/>
                                {/* Here we display the username, and when Edit is Clicked -> ownProf == true -> Edit field is displayed */}
                                {!this.state.ownProf ? (<span className="blue-text" id="1">{this.state.users.username}</span>): (<input type="text" placeholder={this.state.users.username} onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}/>)} 
                                </Label>
                               <br/>
                               <Label> <label htmlFor="2">Status</label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.status}</span>
                                </Label>
                               <br/>
                                <Label> <label htmlFor="2">Creationdate</label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.creationdate.slice(0,10)}</span>
                                </Label>
                               <br/>
                                <Label> <label htmlFor="2">Birthday</label>
                                <br/>
                                 {/* Here we display the birthday, and when Edit is Clicked -> ownProf == true -> Edit field is displayed */}
                                {!this.state.ownProf ? (<span className="blue-text" id="1">{this.state.users.birthday}</span>): (<input type="text" placeholder={this.state.users.birthday} onChange={e => {
                this.handleInputChange('birthday', e.target.value);
              }} />)} 
                                </Label>
                               <br/>
                               <br/>  
                                {/* Here we have a double conditional. We check first is the UserId given by the backend the same as the locally stored one -> 
                                if not display nothing, else we check is ownProf == false or ownProf == true. If false we display the Edit button,else the Save button  */}
                               {id == idUser ? !this.state.ownProf ? (<button className="btn pink" onClick={this.handleClick}>Edit</button>) : (<button className="btn pink" onClick={this.handleSaveClick}>Save</button>) : null}
                              {/* Here we just check if ownProf == true, if it is we display the Cancel Button, else we display nothing*/}
                              {this.state.ownProf ? (<button className="btn pink" onClick={this.handleCancelClick}>Cancel</button>) : null}
                            </form>
                        </section>
                        <button className="btn pink" onClick={this.handleBack}>Back to Overview</button>
                    </div>
                </div>
              </div>
              )}
        </Container>
     );
     
}
}
 
export default withRouter(Profilepage);