import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({
  root: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "400px",
    paddingRight: "10px",
    zIndex: "999999"
  },
  alert: {
    marginTop: "10px",
  }
}))


export default function ErrorAlerts() {

  const classes = useStyles();

  const checklistError = useSelector(state=>state.checklist.error);
  // const authError = useSelector(state=>state.auth.error);

  const [errors, setErrors] = React.useState([]);

  useEffect(()=>{
    if((checklistError) && !errors.includes(checklistError)){
      setErrors([...errors, checklistError]);
    }
  }, [checklistError]);

  const handleClose = (error)=>()=>{
    setErrors(errors.filter(item=>item!==error));
  }

  
  
  const ErrorAlert = ({item, children, ...props})=>{
    const divEl = useRef(null);
    useEffect(()=>{
      if(item?.type === "HTML"){
        divEl.current.innerHTML = item.message;
      }
    },[item])
    return (
      <Alert
        {...props}
      >
        <div ref={divEl}>{children}</div>
      </Alert>
    )
  }
  
  return (
    <div className={classes.root}>
      {errors.map((item, i)=>(
        <ErrorAlert 
          item={item}
          className={classes.alert}
          variant="filled"
          onClose={handleClose(item)}
          key={`Error alert - ${i}`} 
          severity="error"
        >
          {item?.message || item}
        </ErrorAlert>
      ))}
    </div>
  )
}
