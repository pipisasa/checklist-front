import { Button, Card, CardContent, CardHeader, colors, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
  root:{
    minHeight: '100vh',
    backgroundColor: "#60F"
  },
  cardHeader:{
    color: colors.green.A700
  },
  loginBtn: {
    width: "100%"
  }
}))

export default function SuccessRegister() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid className={classes.root} container justify="center" alignContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            title={<h3 className="mb-0">Вы успешно зарегистрировались!</h3>}
            avatar={<CheckCircleOutlineIcon/>}
            subheader="Проверьте вашу почу чтобы подтвердить ваш email"
          />
          <CardContent>
            <Button 
              className={classes.loginBtn} 
              variant="contained" 
              size="large" 
              color="primary"
              onClick={()=>history.push("/auth/login")}
              children="Войти"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
