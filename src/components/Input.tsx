import { Autocomplete, Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { range } from "../utils/range";
import styles from './styles/Input.module.css';

//Zip range of California
// I shrink the list because otherwise will be so big a could cause lack of performance
const start = 93001;
const end = 96162;
// @ts-ignore: Unreachable code error
const options = [...range(start, end)];
const reg = new RegExp(/^\d+$/);
export const Input = () => {

  
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState<any>('');
  const [hasError, setHasError] = useState(false)

  const handleInputChange = (event : React.SyntheticEvent, newInputValue: any) => {
    setInputValue(newInputValue);
  }


  useEffect(() => {
    const isNumber = reg.test( inputValue  )
    if (isNumber || inputValue === '' ) {
      setHasError(false)
    } else {
      setHasError(true)
    }
  }, [inputValue])
  
  return (
    <Grid
        className={ styles.inputContainer }
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
      <Grid
        item
      >
        <Autocomplete
          clearOnBlur={false}
          value={value}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          id="autocomplete-controlled"
          options={options}
          sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField className={ styles.inputField } error={hasError} {...params} label="California zip Codes" helperText='Only number allowed' />
            )}
        />
      </Grid>
      <Grid
        item
        alignContent={'center'}
      >
        <Button disabled={hasError} >
          Save
        </Button>
      </Grid>
  </Grid>  
  )
}
