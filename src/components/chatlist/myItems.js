import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
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


class MyItemsList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      items: [],
      matches: []
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }
  async getMyItems() {
    try {
      const response = await api.get(`/users/${this.state.id}/items`);
      const myItems = response.data;
      this.setState({ 
          items: myItems
        });
    } catch (error) {
      alert(`Something went wrong while loading the items: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <BaseContainer>
      <h3 className="center white-text">Items List</h3>
        <FormContainer>
          <Form>
            <Label>UserId</Label>
            <InputField
              placeholder="Please enter your Id here"
              onChange={e => {
                this.handleInputChange('id', e.target.value);
              }}
            />
            {this.state.items.map(user => {
                return (
                    <>
                  <div className="white-text" onClick = {() => {
                        this.props.history.push(`/chat/${user.id}`)
                      }}>
                      {user.title}
                  </div><br />
                  </>
                );
              })}
            <ButtonContainer>
              <Button
                width="50%"
                onClick={() => {
                  this.getMyItems();
                }}
              >
                Get My Items
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(MyItemsList);
