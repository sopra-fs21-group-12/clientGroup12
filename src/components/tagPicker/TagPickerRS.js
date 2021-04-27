import React, { useEffect } from 'react'
import { TagPicker } from 'rsuite';


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
