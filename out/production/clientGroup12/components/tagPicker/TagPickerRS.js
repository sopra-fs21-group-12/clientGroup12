import React from 'react'
import { TagPicker } from 'rsuite';

const data = [
    {
        "label": "Eugenia",
        "value": "Eugenia",
        "role": "Master"
      },
      {
        "label": "Kariane",
        "value": "Kariane",
        "role": "Master"
      },
];


export default function TagPickerRS() {

    const [selectedTags, setTags] = React.useState([]);
    
    const handleChange = (event) => {
    setTags(event.target.value);

    console.log(selectedTags);
};

    return (
        <TagPicker date={data} style={{ width: 300 }} onChange={handleChange}  />
    )
}
