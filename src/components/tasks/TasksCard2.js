import React from 'react'
import {
  LinearProgress, 
  makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'

import TasksCardItem from './TasksCardItem';
import { confettiContext } from '../../contexts/ConfettiContext';
import AddTaskInput from './AddTaskInput';
import ChecklistDate from '../../helpers/ChecklistDate';

const useStyles = makeStyles((theme)=>({
  root: {
    // minHeight: "100vh",
    paddingTop: "20px",
    backgroundColor: grey[200],
  },
  tHead: props => ({
    backgroundColor: props.isToday ? theme.palette.secondary.main : theme.palette.primary.main,
    color: theme.palette.common.white,
    border: "none"
  }),
  progressBar:{
    backgroundColor: 'transparent',
  },
  subHeader:{
    fontSize: "12px"
  }
}));

const weekDays = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

export default function DailyTasksCard({items=[], date}) {
  const isToday = new Date(date).toDateString() === new Date().toDateString();
  const classes = useStyles({ isToday });
  const checkedItemsCount = items.filter(a=>a.status).length;
  const d = new Date(date);

  const {congrat} = React.useContext(confettiContext);

  const handleItemClick = (status)=>{
    if(status && checkedItemsCount === items.length-1){
      congrat();
    }
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead className={classes.tHead}>
          <TableRow style={{display:'flex', flexDirection: 'column'}}>
            <TableCell className={classes.tHead}>
              {/* <CircularProgressWithLabel className={classes.progressBar} value={Math.floor((checkedItemsCount/(items.length || 1))*100)}/> */}
              {weekDays[d.getDay()]}
              <Typography className={classes.subHeader} color="inherit">
                {ChecklistDate.getOnlyDate(d)}
                <br/>
                {checkedItemsCount}/{items.length+" "} completed
              </Typography>
            </TableCell>
            <td style={{border: 'none'}}>
              <LinearProgress className={classes.progressBar} variant="determinate" color={isToday ? "primary" : "secondary"} value={Math.floor((checkedItemsCount/(items.length || 1))*100)}/>
            </td>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row=>{
            return(
              <TasksCardItem 
                onClick={handleItemClick}
                key={`tasks-item-${date}-${row.id}`}
                data={row}
              />
            );
          })}
          <AddTaskInput date={d}/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
