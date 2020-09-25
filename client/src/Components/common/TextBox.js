import React from 'react';
import {FormControl, FormHelperText, TextField} from '@material-ui/core/';

const TextBox = ({label, helperText, error, setter, value}) => {
  return (
    <FormControl>
      <TextField
      {...error && null}
      label={label}
      variant="outlined"
      onChange={setter}
      value={value}
      size="small"
    />
      <FormHelperText id="my-helper-text">{helperText ? helperText : ''}</FormHelperText>
    </FormControl>
  )
}

export default TextBox;