import { Drawer } from '@material-ui/core';
import React, { useReducer } from 'react';
import Sidebar from '../components/Sidebar';

export const sidebarContext = React.createContext();

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

const SidebarProvider = ({ children })=>{
  
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const toggle = ()=>dispatch({
    type: "TOGGLE"
  })
  const resetValues = () => dispatch({ type: "RESET" })

  return (
    <sidebarContext.Provider value={{
      isDrawerOpen: state.isOpen,
      toggleDrawer: toggle,
      dispatchDrawer: dispatch,
      resetValues,
    }}>
      <Drawer anchor="left" open={state.isOpen} onClose={resetValues}>
        <Sidebar/>
      </Drawer>
      {children}
    </sidebarContext.Provider>
  )
};

export default SidebarProvider;