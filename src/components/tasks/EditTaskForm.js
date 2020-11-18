import React, { useState } from 'react';
import { Button, FormControl, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { changeItem } from '../../redux/actions';

const useStyles = makeStyles({
  root: {
    padding: "10px"
  },
  inputText: {
    width: "100%",
    marginBottom: "10px"
  },
  submitBtn: {
    marginTop: "10px"
  },
  colorBox:{
    display: "inline-block",
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    marginRight: '10px'
  }
});

const colors = [
  '#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722'
];

function EditTaskForm({toggleModal, data}) {
  const classes = useStyles();
  const today = new Date(data.date);
  
  const [text, setText] = useState(data.title);
  const [date, setDate] = useState(`${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,0)}-${today.getDate().toString().padStart(2,0)}`);
  const [color, setColor] = useState(data.color);

  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(changeItem({
      ...data,
      title: text,
      date,
      color,
    }))
    toggleModal();
  }
  const handleDateChange = ({target:{value}})=>{
    setDate(value);
  }
  const handleTextChange=(e)=>{
    setText(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormGroup>
        <TextField
          label="Введите название..."
          className={classes.inputText}
          value={text}
          onChange={handleTextChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormControl className={classes.formControl}>
          <InputLabel id="color-select">Color</InputLabel>
          <Select
            color="secondary"
            labelId="color-select"
            id="color-select"
            value={color}
            onChange={(e)=>setColor(e.target.value)}
          >
            <MenuItem key="color-select-item" value="inherit">
              None
            </MenuItem>
            {colors.map((color,i)=>(
              <MenuItem key={`color-select-item-${i}`} value={color}>
                <Grid container alignItems="center">
                  <div className={classes.colorBox} style={{background: color}}></div>
                  {color}
                </Grid>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <TextField
          label="Начало"
          type="date"
          value={date}
          onChange={handleDateChange}
          className={classes.textField}
          required
        />
      </FormGroup>
      <FormGroup>
        <Button
          variant="contained"
          color="primary"
          className={classes.submitBtn}
          type="submit"
        >
          Save
        </Button>
      </FormGroup>
    </form>
  )
}

export default EditTaskForm
