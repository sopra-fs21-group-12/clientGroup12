import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Chat from "../../chatlist/chat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class ChatRouter extends React.Component {

  render() {
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/:id`} component={Chat}     
          state={2}
          />
      </Container>
    );
  }
}
export default ChatRouter;
