import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, Select, Chip, Button } from '@material-ui/core';

// used for styling
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
      //outlined does not work...
      variant:"outlined"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 4,
      },
  }));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// predefined tags to show in the menu
const tags = [
    'Electronics',
    'Furniture',
    'Fashion',
    'Collectibles & Art',
    'Toys'
];

export default function MultipleSelect() {
  const [selectedTags, setTags] = React.useState([]);
  const classes = useStyles();

  const handleChange = (e) => {
    setTags(e.target.value);
  };

  // store selectedTags in sessionStorge for further access
  useEffect(() =>{
    sessionStorage.setItem("selectedTags", selectedTags);
  }, [selectedTags]);

  return (
      <div>
    {/* how to get this field in outlined style?*/}
      <FormControl className={classes.formControl}>
      <InputLabel>Add Tag</InputLabel>
        <Select
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} variant="outlined" className={classes.chip}/>
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tags) => (
            <MenuItem key={tags} value={tags}>
              {tags}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
  );
}
