import React from 'react'
import { Card, CardHeader, Checkbox, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core'
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import MoreIcon from '@material-ui/icons/MoreVert';
import {grey} from '@material-ui/core/colors'

import { useDispatch } from 'react-redux';
import { toggleItem } from '../../redux/actions';

const useStyles = makeStyles((theme)=>({
  root: {
    minHeight: "100vh",
    paddingTop: "20px",
    backgroundColor: grey[200],
  },
  cardHeader: props => ({
    padding: theme.spacing(1, 2),
    backgroundColor: props.isToday ? theme.palette.primary.main : "#FFF",
    color: props.isToday ? "#FFF" : "#000"
  }),
  list: {
    // width: 200,
    // height: 230,
    backgroundColor: theme.palette.background.paper,
    // overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  subHeader:{
    fontSize: "12px"
  }
}));

export default function DailyTasksCard({items=[], type, date}) {
  const isToday = new Date(date).toDateString() === new Date().toDateString();
  
  const classes = useStyles({ isToday });
  const dispatch = useDispatch();

  const handleToggle = (item) => () => {
    dispatch(toggleItem(item));
  };


  const checkedItemsCount = items.filter(a=>a.status).length;

  return (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <CircularProgressWithLabel className={classes.progressBar} value={Math.floor((checkedItemsCount/(items.length || 1))*100)}/>
        }
        title={date}
        subheader={<Typography className={classes.subHeader} color="inherit">{checkedItemsCount}/{items.length+" "} completed</Typography>}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-all-item-${item._id}-label`;

          return (
            <ListItem key={item._id} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={item.status || false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.title} />
              <IconButton>
                <MoreIcon/>
              </IconButton>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  )
}
