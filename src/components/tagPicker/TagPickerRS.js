import React, { useEffect } from 'react'
import { TagPicker } from 'rsuite';

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

export default function TagPickerRS() {

    const [selectedTags, setTags] = React.useState([]);
    
    const handleChange = (event) => {
    setTags(event);
    };

    // safe the selectedTags in sessionStorage
    useEffect(() =>{
        sessionStorage.setItem("selectedTags", selectedTags);
      }, [selectedTags]);

    return (
        <TagPicker placeholder="Add Tags" size='lg' data={tags} style={{ width: 300 }} onChange={handleChange}  />
    )
}
