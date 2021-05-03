import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ChecklistDate from '../helpers/checklistDate';
import { SET_DATE } from '../redux/checklist/constants';

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
    fontSize: "20px"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  syncBtn: {
    color: "rgb(255 255 255 / 26%) !important"
  },
  progressBar: {
    color: "rgb(255 255 255 / 26%)"
  },
  logoContainer:{
    display: "flex",
    alignItems: "center"
  },
  topBarBtn:{
    color: "#FFF"
  }
}));

export default function TopAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const {loading, date} = useSelector(state => state.checklist);
  const dispatch = useDispatch();
  const handleNext = ()=>{
    const newDate = new ChecklistDate(date.start_date, date.mode);
    newDate.toNext();
    dispatch({
      type: SET_DATE,
      payload: {
        start_date: newDate.start_date
      }
    })
  };
  const handlePrev = ()=>{
    const newDate = new ChecklistDate(date.start_date, date.mode);
    newDate.toPrev();
    dispatch({
      type: SET_DATE,
      payload: {
        start_date: newDate.start_date
      }
    })
  };

  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <Button onClick={handlePrev} className={classes.topBarBtn}>
            Prev
          </Button>
          <div className={classes.logoContainer}>
            <Typography onClick={()=>history.replace("/")} className={classes.title} variant="h6" noWrap>
              Checklist
            </Typography>
            <IconButton className={classes.syncBtn} disabled>
              {loading ? (
                <CircularProgress className={classes.progressBar} size={20}/>
              ) : (
                <CloudDoneIcon/>
              )}
            </IconButton>
          </div>
          <Button onClick={handleNext} className={classes.topBarBtn}>
            Next
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
