import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { Suspense, useState } from 'react'
import ConfettiProvider from '../contexts/ConfettiContext'
import SidebarProvider from '../contexts/SidebarContext'
import { isUserAuthenticated } from '../helpers/authUtils'
import BottomAppBar from './BottomAppBar'
import TopAppBar from './TopAppBar'

const LoadingPage = ()=>(
  <Grid style={{minHeight: "100vh", backgroundColor: "#60f", color: "#FFF"}} container justify="center" alignContent="center">
    <Grid item>
      <CircularProgress color="inherit" size={70} />
    </Grid>
  </Grid>
)

const useStyles = makeStyles(()=>({
  root:{
    display: ({isAuth})=> isAuth ? "flex" : "block",
    flexDirection: "column",
    height: "100vh",
    background: "#eeeeee",
  },
  wrapper: {
    flexGrow: 1,
    height: "100%",
    overflow: "scroll",
  },
  appBarDiv: {
    height:"65px"
  }
}))

export default function withLayout(WrappedComponent) {
  return ()=>{
    const isAuth = isUserAuthenticated();
    const [isSearchOpen, toggleSearch] = useState();
    const classes = useStyles({isAuth});
    return (
      <SidebarProvider>
        <div className={classes.root}>
          {isAuth && (
            <TopAppBar 
              isSearchOpen={isSearchOpen}
              toggleSearch={toggleSearch}
            />
          )}
          <div className={classes.wrapper}>
            <Suspense fallback={<LoadingPage/>}>
              <ConfettiProvider>
                <WrappedComponent/>
              </ConfettiProvider>
            </Suspense>
          </div>
          {isAuth && (
            <BottomAppBar 
              toggleSearch={toggleSearch}
            />
          )}
        </div>
      </SidebarProvider>
    )
  }
}
