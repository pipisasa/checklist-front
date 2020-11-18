import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
    fontSize: "20px"
  },
  toolbar: {
    display: "flex",
  },
  syncBtn: {
    color: "rgb(255 255 255 / 26%) !important"
  },
  progressBar: {
    color: "rgb(255 255 255 / 26%)"
  }
}));

export default function TopAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const loading = useSelector(state => state.checklist.loading);

  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
