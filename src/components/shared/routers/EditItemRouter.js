import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import PictureInventory from "../../pictures/PictureInventory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class EditItemRouter extends React.Component {
    constructor(props){
        super(props)
        console.log("Test")
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/:id`} component={PictureInventory}   
                />
            </Container>
        );
    }
}
export default EditItemRouter;