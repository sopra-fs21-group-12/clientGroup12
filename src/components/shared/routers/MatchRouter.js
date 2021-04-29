import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import MyMatches from "../../matches/MyMatches";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class MatchRouter extends React.Component {

    render() {
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/:id`}
                    render={(props) => <MyMatches {...props} />}
                />
            </Container>
        );
    }
}
export default MatchRouter;