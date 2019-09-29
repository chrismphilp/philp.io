import React, { FunctionComponent, useState } from 'react';
import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

type FilterCheckboxRowProps = {
  labelText: string;
};

const FilterCheckboxRow: FunctionComponent<FilterCheckboxRowProps> = (props) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  return (
    <ListItem role={undefined} dense button onClick={() => handleClick()}>
      <ListItemIcon>
        <Checkbox edge="start"
                  checked={checked}
                  tabIndex={-1}/>
      </ListItemIcon>
      <ListItemText primary={props.labelText}/>
    </ListItem>
  );
};

export default FilterCheckboxRow;