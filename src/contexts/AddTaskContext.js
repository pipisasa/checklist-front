import { Drawer } from '@material-ui/core';
import React, { useReducer } from 'react';
import AddTaskForm from '../components/tasks/AddTaskForm';

export const addTaskContext = React.createContext();

const INIT_STATE = {
  isOpen: false,
}

const reducer = (state=INIT_STATE, action)=>{
  switch (action.type) {
    case "TOGGLE": return {...state, isOpen: !state.isOpen};
    case "RESET": return INIT_STATE;
    default: return state
  }
}

const AddTaskProvider = ({ children })=>{
  
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const toggle = ()=>dispatch({
    type: "TOGGLE"
  })
  const resetValues = () => dispatch({ type: "RESET" })

  return (
    <addTaskContext.Provider value={{
      isDrawerOpen: state.isOpen,
      toggleDrawer: toggle,
      dispatchDrawer: dispatch,
      resetValues,
    }}>
      <Drawer anchor="top" open={state.isOpen} onClose={resetValues}>
        <AddTaskForm/>
      </Drawer>
      {children}
    </addTaskContext.Provider>
  )
};

export default AddTaskProvider;