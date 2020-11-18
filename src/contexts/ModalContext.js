import React, { useReducer } from 'react';
import { Modal } from '@material-ui/core';

export const modalContext = React.createContext();

const INIT_STATE = {
  isOpen: false,
  component: null,
  componentProps: {},
}

const reducer = (state=INIT_STATE, action)=>{
  switch (action.type) {
    case "TOGGLE": return {...state, isOpen: !state.isOpen};
    case "SET_MODAL": return {...state, component: action.payload.component, componentProps: action.payload.props}
    case "RESET": return INIT_STATE;
    default: return state
  }
}

const ModalProvider = ({ children })=>{
  
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const toggle = ()=>dispatch({
    type: "TOGGLE"
  })
  const resetModal = () => dispatch({ type: "RESET" });
  const setModal = (props)=>dispatch({
    type: "SET_MODAL",
    payload: props
  })

  return (
    <modalContext.Provider value={{
      isModalOpen: state.isOpen,
      toggleModal: toggle,
      dispatchModal: dispatch,
      resetModal,
      setModal,
    }}>
      <Modal open={state.isOpen} onClose={toggle}>
        {state.component && state.componentProps && <state.component {...state.componentProps}/>}
      </Modal>
      {children}
    </modalContext.Provider>
  )
};

export default ModalProvider;