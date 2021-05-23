import React, { useEffect } from 'react'
import { InputPicker } from 'rsuite';


export default function InputPickerSwipe(props) {

    function handleChange(event) {
        props.onChange(event);
    }

    return (
        <InputPicker
            placeholder="Add Tags"
            size='lg'
            creatable="false"
            data={props.tags}
            style={{ width: 300 }}
            onChange={handleChange}
            value={props.value}/>
    )
}
