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
import { registerUser } from '../../redux/actions';
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

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error:requestError, loading } = useSelector(state=>state.auth);


  const RegisterForm = ({
    values,
    handleChange,
    errors,
    handleBlur,
    touched,
    handleSubmit,
  })=>(
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          label="Введите email"
          error={ !!requestError?.email?.length || (!!errors.email && touched.email) }
          className={classes.inp}
          type="email"
          name="email"
          onBlur={handleBlur}
          helperText={ requestError?.email || ((!!errors.email && touched.email) && errors.email) }
          onChange={handleChange}
          value={values.email}
          required
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Придумайте логин"
          error={ !!requestError?.username?.length || (!!errors.username && touched.username) }
          className={classes.inp}
          type="text"
          name="username"
          onBlur={handleBlur}
          helperText={ requestError?.username || ((!!errors.username && touched.username) && errors.username) }
          onChange={handleChange}
          value={values.username}
          required
        />
      </FormGroup>
      <FormGroup>
        <TextField
          label="Придумайте пароль"
          error={ !!requestError?.password?.length || (!!errors.password && touched.password) }
          className={classes.inp}
          type="text"
          name="password"
          onBlur={handleBlur}
          helperText={ requestError?.password || ((!!errors.password && touched.password) && errors.password) }
          onChange={handleChange}
          value={values.password}
          required
        />
      </FormGroup>

      <FormGroup>
        <TextField
          label="Повторите пароль"
          error={!!errors.password2 && touched.password2}
          className={classes.inp}
          type="text"
          name="password2"
          onBlur={handleBlur}
          helperText={(!!errors.password2 && touched.password2) && errors.password2}
          onChange={handleChange}
          value={values.password2}
          required
        />
      </FormGroup>

      <Button className={classes.btnSubmit} variant="contained" color="primary" type="submit" disabled={loading}>
        Отправить
      </Button>
      <Link className={classes.signupLink} onClick={()=>history.replace("/auth/login")}>
        Уже есть аккаунт?
      </Link>

    </form>
  );


  
  const validator = (values)=>{
    const errors = {};
    if(!values.email.trim()){
      errors.email = "Это поле обязательно!"
    }else if(!myValidatior.isEmail(values.email)){
      errors.email = "Не правильный email"
    }
    if(!values.password){
      errors.password = "Это поле обязательно!"
    }else if(values.password.length < 6){
      errors.password = "Минимальная длина Пароля 6 символов";
    }

    if(!values.password2){
      errors.password2 = "Это поле обязательно!"
    }else if(values.password !== values.password2){
      errors.password2 = "Пароли не совпадают"
    }

    if(!values.username.trim()){
      errors.username = "Это поле обязательно!";
    }else if(values.username.length<3 || values.username>16){
      errors.username = "Допустимая длинна от 3 до 16 символов"
    }else if(!(/^[a-z0-9_\-.]{3,16}$/i).test(values.username)){
      errors.username = 'Поддерживается только латиница, цифры и такие символы как ( _ - . )'
    }

    return errors;
  }


  const handleFormSubmit = ( values )=>{
    console.log(values);
    dispatch(registerUser(values, ()=>{
      history.replace("/auth/successful-register");
    }))
  };

  return (
    <Grid className={classes.root} container justify="center" alignContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Card>
          <CardHeader className="mb-0 pb-0" title={<h3 className="mb-0">Регистрация</h3>}/>
          <CardContent className="pt-0 mt-0">
            <Formik
              initialValues={{ email: "", password:"", password2: "", username: "" }}
              validate={validator}
              onSubmit={handleFormSubmit}
            >
              {RegisterForm}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
