import React from 'react'
import { 
  Button,
  Card, 
  CardHeader,
  FormGroup,
  Grid, 
  makeStyles, 
  TextField,
  Link,
  CardContent,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import myValidatior from 'validator';
import { loginUser } from '../../redux/actions';
import {Formik} from 'formik';
const useStyles = makeStyles(()=>({
  root: {
    minHeight: '100vh',
    backgroundColor: '#60f',
  },
  btnSubmit: {
    width: "100%",
    margin: "20px 0"
  },
  inp: {
    margin: "10px 0"
  },
  signupLink:{
    display: "block",
    textAlign: "end"
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state=>state.auth);


  const LoginForm = ({
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    isSubmitting,
  })=>(
    <form onSubmit={handleSubmit}>
      {error && (
        <h4 style={{color: "red"}}>{error}</h4>
      )}
      <FormGroup>
        <TextField
          label="Введите email"
          error={!!errors.email && touched.email}
          className={classes.inp}
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={(!!errors.email && touched.email) && errors.email}
          placeholder="demo@demo.com"
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Введите пароль"
          error={!!errors.password && touched.password}
          className={classes.inp}
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={(!!errors.password && touched.password) && errors.password}
        />
      </FormGroup>
      <Link onClick={()=>history.replace("/auth/forgot-password")}>
        Забыли пароль?
      </Link>
      <Button className={classes.btnSubmit} variant="contained" color="primary" type="submit" disabled={loading}>
        Отправить
      </Button>
      <Link className={classes.signupLink} onClick={()=>history.replace("/auth/register")}>
        Нет аккаунта?
      </Link>

    </form>
  );
  
  const validator = (values)=>{
    const errors = {};
    if(!values.email.trim()){
      errors.email = "Это поле обязательно!" 
    }else if(!myValidatior.isEmail(values.email)){
      errors.email = "Не правильный email!"
    }
    if(!values.password){
      errors.password = "Это поле обязательно!"
    }else if(values.password.length < 5){
      console.log("Hello Password")
      errors.password = "Минимальная длина Пароля 6 символов";
    }
    return errors;
  };

  const handleFormSubmit = ( values )=>{
    console.log(values);
    dispatch(loginUser(values, ()=>{
      history.replace("/");
    }))
  };

  return (
    <Grid className={classes.root} container justify="center" alignContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Card>
          <CardHeader className="mb-0 pb-0" title={<h3 className="mb-0">Вход</h3>}/>
          <CardContent className="pt-0 mt-0">
            <Formik
              initialValues={{ email: "", password:"" }}
              validate={validator}
              onSubmit={handleFormSubmit}
            >
              {LoginForm}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
