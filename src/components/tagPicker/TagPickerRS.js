import React, { useEffect } from 'react'
import { TagPicker } from 'rsuite';



// save this in backend and make api call?
/*
const tags = [
    {
        "label": "Electronics",
        "value": "Electronics",
      },
      {
        "label": "Furniture",
        "value": "Furniture",
      },
      {
        "label": "Fashion",
        "value": "Fashion",
      },
      {
        "label": "Collectibles & Art",
        "value": "Collectibles & Art",
      },
      {
        "label": "Toys",
        "value": "Toys",
      },
];
*/

export default function TagPickerRS(props) {
    
    function handleChange(event) {
      props.onChange(event);
    }

    return (
        <TagPicker
            placeholder="Add Tags"
            size='lg'
            data={props.tags}
            style={{ width: 300 }}
            onChange={handleChange}
            value={props.value}/>
    )
}
