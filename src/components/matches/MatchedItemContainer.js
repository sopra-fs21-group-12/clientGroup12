import React  from 'react'
import { useHistory } from "react-router-dom";
import {Panel} from "rsuite";
import {Grid, Button} from "@material-ui/core";
import styled from 'styled-components';
import Picture from "../pictures/Picture";


const Label = styled.label`
  position: static;
  left: 14.95%;
  right: 75.81%;
  top: 27.34%;
  bottom: 60.16%;
  
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  /* identical to box height, or 133% */
  text-align: center;

  color: #000000;
`;

const ItemTitle = styled.title`
  position: static;
  left: 14.95%;
  right: 57.2%;
  top: 39.84%;
  bottom: 28.91%;
  
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 40px;

  /* identical to box height, or 167% */

  /* Colors / Black */
  color: #18191F;


`;

export default function MatchedItemContainer(props) {

    const history = useHistory();


    return (
        <Grid container justify="center" spacing={6}>
            <Grid item xs={12}>
                <Panel shaded collapsible
                       header={
                           <Grid container justify="flex-start" alignItems="center">
                               <Grid item xs={2}>
                                   <Picture key={props.item.id}/>
                               </Grid>
                               <Grid item xs={7}>
                                   <Label>Matched with</Label>
                                   <h3>{props.item.title}</h3>
                               </Grid>
                               <Grid item xs={3}>
                                   <Button
                                       variant="contained"
                                       color="primary"
                                       onClick={() => history.push('/chat/' + props.item.id)}
                                   >
                                       Chat
                                   </Button>
                               </Grid>
                           </Grid>
                       }>
                    <h6>{props.item.description}</h6>
                </Panel>
            </Grid>
        </Grid>
    )
}
