import React from 'react'
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';

// const sidebarItems = [
//   {

//   }
// ];

const useStyles = makeStyles(_=>({
  root:{
    height: "100vh",
    overflowY: "scroll",
    minWidth: "200px"
  }
}));

function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid className={classes.root} container direction="column" justify="space-between">
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Divider />
        <List>
          <ListItem button onClick={()=>history.push("/")}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          <ListItem button onClick={()=>history.push("/admin")}>
            <ListItemIcon>
              <LockIcon/>
            </ListItemIcon>
            <ListItemText primary="Admin"/>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default Sidebar
