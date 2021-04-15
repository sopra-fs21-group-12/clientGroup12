import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, Select, Chip, Button } from '@material-ui/core';
import TagPicker from './components/tagPicker/TagPicker';
import TagPickerRS from './components/tagPicker/TagPickerRS';

class TestPage extends React.Component {
  render() {
    return (
      <div>
      <TagPicker/>
      <Button variant="contained" onClick={() => alert(sessionStorage.getItem("selectedTags"))}>Show selected Tags</Button>
      </div>
    );
  }
}

export default withRouter(TestPage);
