import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profilepage from "../../profilepage/Profilepage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class ProfileRouter extends React.Component {

  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/:id`} component={Profilepage}     />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default ProfileRouter;
