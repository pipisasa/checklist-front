import React, { lazy } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import withLayout from '../components/Layout';
import { getLoggedInUser } from '../helpers/authUtils';


const PrivateRoute = (props)=>{
  const {component: Children,roles=[], ...rest} = props;
  const role = getLoggedInUser()?.role || "USER";

  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <Route 
      {...rest} 
      component={props=>{
        return isAuth ? (
          roles.includes(role) ? <Children/> : roles.length ? <Redirect to="/"/> : <Children/>
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: {from: props.location}
            }}
          />
        )
      }}
    />
  )
}


//? Pages
const Home = lazy(()=>import('./Home'));
const Settings = lazy(()=>import('./Settings'));
const Admin = lazy(()=>import('./Admin'));

//? Auth pages
const Login = lazy(()=>import('./auth/Login'));
const Logout = lazy(()=>import('./auth/Logout'));
const Register = lazy(()=>import('./auth/Register'));
const SuccessRegister = lazy(()=>import('./auth/SuccessRegister'));

const Routes = ()=>{
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute 
          exact 
          path="/"
          component={withLayout(Home)}
        />
        <PrivateRoute 
          exact 
          path="/settings"
          component={withLayout(Settings)}
        />
        <PrivateRoute 
          exact 
          path="/admin"
          roles={["ADMIN","SUPER_ADMIN","CREATOR"]}
          component={withLayout(Admin)}
        />

        <Route
          exact
          path="/auth/login"
          component={withLayout(Login)}
        />
        <Route
          exact
          path="/auth/register"
          component={withLayout(Register)}
        />
        <Route
          exact
          path="/auth/logout"
          component={withLayout(Logout)}
        />
        <Route
          exact
          path="/auth/successful-register"
          component={withLayout(SuccessRegister)}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;