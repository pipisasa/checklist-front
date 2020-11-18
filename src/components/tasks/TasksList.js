import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useMemo } from 'react'
import TasksCard2 from './TasksCard2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    padding: "20px 5px",
    minWidth: "100%",

    [theme.breakpoints.up("sm")]:{
    //   overflowX: "scroll",
      flexWrap: "nowrap",
      width: "auto",
    },
    userSelect: "none", 
  },
  cardGridItem: {
    minWidth: "100%",
    boxSizing: "border-box",
    border: "5px solid transparent",

    [theme.breakpoints.up("sm")]:{
      minWidth: "33.33%",
    },
    [theme.breakpoints.up("md")]:{
      minWidth: "25%",
    },
  }
}));

export default function TasksList() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: tasks, date: checklistDate } = useSelector(state=>state.checklist);

  const dates = useMemo(()=>{
    const obj = {};
    for(let i = 0; i<=checklistDate.diapazone; i++){
      const d = new Date(checklistDate.start_date.getTime()+i*86400000);
      obj[d.toJSON()] = [];
    }
    tasks.forEach((item)=>{
      const d = new Date(item.date)
      d.setHours(0,0,0,0);
      const k = d.toJSON();
      Array.isArray(obj[k]) ? obj[k].push(item) : obj[k]=[item];
    });
    return Object.entries(obj).sort((a,b)=>new Date(a[0]).getTime()-new Date(b[0]).getTime());
  }, [tasks, checklistDate]);
  console.log(dates)
  
  useEffect(()=>{
    dispatch(fetchData());
  },[dispatch, checklistDate]);

  return (
    <Grid container className={classes.root}>
      {dates.map(([date, items])=>(
        <Grid className={classes.cardGridItem} item xs={12} sm={checklistDate.mode==="WEEK" ? 4 : 12} md={checklistDate.mode==="WEEK"?3:12} key={"daily-task-card-"+date}>
          <TasksCard2 date={date} items={items}/>
        </Grid>
      ))}
    </Grid>
  )
}
