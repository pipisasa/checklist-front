import React from 'react'
import { 
  Card,
  CardContent,
  // CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  TableCell,  
  TableRow, 
} from '@material-ui/core'

import { useDispatch } from 'react-redux';
import { toggleItem } from '../../redux/actions';
import { Edit } from '@material-ui/icons';
import EditTaskForm from './EditTaskForm';


const useStyles = makeStyles(()=>({
  tCell:{
    cursor: "pointer",
  },
  editBtn:{
    marginLeft: "10px",
    '& .MuiSvgIcon-root':{
      fontSize: "14px"
    }
  },
  taskTitle: {
    borderRadius: "30px",
    padding: '0 7px',
  },
  modalCard: {
    // minWidth: "200px"
  },
  modalContainer:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  }
}));

function TasksCardItem({data, onClick}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleToggle = ()=>{
    dispatch(toggleItem(data))
    onClick(!data.status)
  };
  const toggleModal=()=>setIsModalOpen(!isModalOpen);
  const handleEditClick = (e)=>{
    e.stopPropagation();
    console.log("EDIT");
    toggleModal();
  }

  return (
  <>
    <TableRow>
      <TableCell 
        className={classes.tCell} 
        onClick={handleToggle}
        style={{textDecoration: data.status ? 'line-through' : 'none'}}
      >
        <Grid container justify="space-between">
          <span className={classes.taskTitle} style={{background: data.color}}>
            {data.title}
          </span>
          <IconButton onClick={(e)=>handleEditClick(e)} size="small" className={classes.editBtn}>
            <Edit color="secondary" />
          </IconButton>
        </Grid>
      </TableCell>
    </TableRow>
    <Modal open={isModalOpen} onClose={toggleModal}>
      <Grid className={classes.modalContainer} container justify="center" alignItems="center">
        <Grid item xs={10} sm={6} lg={4}>
          <Card className={classes.modalCard}>
            {/* <CardHeader
              title="Edit"
              subheader={data.title + " " + data.date.split("T")[0]}
              /> */}
            <CardContent>
              <EditTaskForm data={data} toggleModal={toggleModal}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  </>
  )
}

export default TasksCardItem
