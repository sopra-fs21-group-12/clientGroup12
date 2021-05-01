import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import MyMatches from "../../matches/MyMatches";
import SwipePage from "../../game/SwipePage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class SwipeRouter extends React.Component {

    render() {
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/:id`}
                    render={(props) => <SwipePage {...props} />}
                />
            </Container>
        );
    }
}
export default SwipeRouter;