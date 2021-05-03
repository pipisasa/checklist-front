import React, { useState } from 'react'
import { Input, makeStyles, TableCell, TableRow } from '@material-ui/core';
import ChecklistDate from '../../helpers/checklistDate';
import { useDispatch } from 'react-redux';
import { addNewItem } from '../../redux/actions';


const useStyles = makeStyles(()=>({
  inp:{
    width: '100%',

    '& input':{
      padding:0
    }
  }
}));

function AddTaskInput({date:d}) {
  const classes = useStyles();
  const [val,setVal] = useState('');
  const dispatch = useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    d.setHours(0,0,0,0);
    dispatch(addNewItem({
      title: val,
      start_date: ChecklistDate.getOnlyDate(d),
      end_date: ChecklistDate.getOnlyDate(d),
    }))
    setVal('');
  }
  return (
    <TableRow className={classes.tRow}>
      <TableCell>
        <form onSubmit={handleSubmit}>
          <Input 
            className={classes.inp} 
            value={val}
            onChange={(e)=>setVal(e.target.value)}
          />
        </form>
      </TableCell>
    </TableRow>
  )
}

export default AddTaskInput;