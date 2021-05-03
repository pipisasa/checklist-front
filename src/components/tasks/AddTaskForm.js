import React, { useContext, useRef, useState } from 'react';
import { Button, FormGroup, makeStyles, TextField } from '@material-ui/core';
import { addTaskContext } from '../../contexts/AddTaskContext';
import { useDispatch } from 'react-redux';
import { addNewItem } from '../../redux/actions';
import ChecklistDate from '../../helpers/checklistDate';

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
  }
});

export default function AddTaskForm() {
  const classes = useStyles();
  const text = useRef(null);
  const [fromDate, setFromDate] = useState(ChecklistDate.getOnlyDate());
  const [toDate,setToDate] = useState(ChecklistDate.getOnlyDate());
  const { toggleDrawer } = useContext(addTaskContext);
  const dispatch = useDispatch();
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(addNewItem({
      title: text.current.value,
      start_date: fromDate,
      end_date: toDate,
    }))
    toggleDrawer();
  }
  const handleFromDateChange = ({target:{value}})=>{
    setFromDate(value);
    setToDate(new Date(value) > new Date(toDate) ? value : toDate);
  }
  const handleToDateChange = ({target:{value}})=>{
    setToDate(new Date(value) > new Date(fromDate) ? value : fromDate);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormGroup>
        <TextField
          label="Введите название..."
          className={classes.inputText}
          inputProps={{ref: text}}
          required
          />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Начало"
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className={classes.textField}
          required
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Конец"
          type="date"
          value={toDate}
          onChange={handleToDateChange}
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
