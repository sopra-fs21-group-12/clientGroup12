import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import {Panel} from "rsuite";
import {Grid, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import styled from 'styled-components';
import Picture from "../pictures/Picture";
import BackToInventory from "../RedirectButtons/BackToInventory";


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

export default function UserItemContainer(props) {

    const history = useHistory();


    return (
        <Grid container justify="center" spacing={6}>
            <Grid item xs={12}>
                <Panel shaded>
                           <Grid container justify="flex-start" alignItems="center">
                               <Grid item xs={2}>
                                   <Picture itemId={props.item.id}/>
                               </Grid>
                               <Grid item xs={6}>
                                   <Label>Swiping with your</Label>
                                   <h3>{props.item.title}</h3>
                               </Grid>
                               <Grid item xs={4}>
                                   <BackToInventory/>
                               </Grid>
                           </Grid>
                </Panel>
            </Grid>
        </Grid>
    )
}
