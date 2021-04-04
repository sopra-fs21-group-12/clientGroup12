import React from 'react';
import { withRouter } from 'react-router-dom';
//import { Button } from '../../views/design/Button';
import { FlexboxGrid, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button } from 'rsuite'; 


class TestPage extends React.Component {
  render() {
    return (
        <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <Panel header={<h3>Login</h3>} bordered>
            <Form fluid>
              <FormGroup>
                <ControlLabel>Username or email address</ControlLabel>
                <FormControl name="name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary">Sign in</Button>
                  <Button appearance="link">Forgot password?</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

export default withRouter(TestPage);
