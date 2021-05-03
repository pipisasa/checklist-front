import React from 'react'
import { FormControl, InputLabel, makeStyles, MenuItem, MuiThemeProvider, Select, createMuiTheme } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { SET_DATE } from '../redux/checklist/constants'
import ChecklistDate from '../helpers/checklistDate'

const useStyles = makeStyles(theme=>({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: theme.palette.common.white,

    // '& .MuiInput-underline:before':{
    //   borderColor: 'rgb(255 255 255 / 42%)',
    // },
    // '& .MuiSelect-selectMenu':{
    //   color: theme.palette.common.white,
    // }
  },
}))


const muiTheme = createMuiTheme({
  palette:{
    primary:{
      main:'#ff3d00',
    },
    text:{
      primary:{
        main: '#ff3d00',
      },
      secondary:{
        main:'#ff3d00',
      }
    },
    action:{
      active:"#ff3d00",
    }
  }
})
const FilterTasks = ()=>{
  const classes = useStyles();

  const [value, setValue] = React.useState(ChecklistDate.mode.WEEK.title)

  const dispatch = useDispatch();
  // const { date } = useSelector(state=>state.checklist);

  const handleChangeValue = (e)=>{
    setValue(e.target.value);
    const d = new ChecklistDate( Date.now(), e.target.value );
    if(d.mode === "WEEK"){
      d.setStartMonday()
    }
    dispatch({
      type: SET_DATE,
      payload: d
    });
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
        <Select
          color="secondary"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChangeValue}
        > 
          {Object.entries(ChecklistDate.mode).map(([k,v])=>(
            <MenuItem 
              key={'filter-date-menu-item-'+k} 
              value={k}
            >
              {v.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </MuiThemeProvider>
  )
}

export default FilterTasks;