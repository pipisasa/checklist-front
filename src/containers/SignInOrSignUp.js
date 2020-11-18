import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import {AnimateSharedLayout, motion} from 'framer-motion';

const useStyles = makeStyles(()=>({
  root: {
    height: '100vh',
    backgroundColor: '#60f',
  },
  signInCard:{
    cursor: 'pointer',
    margin: '0 auto',
    borderRadius: '20px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '15px 0'
  },
  cardHeader:{
    margin: 0
  },
}))

export default function signInOrSignUp() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container justify="center" alignContent="center">
      <AnimateSharedLayout type="crossfade">
        <Grid item xs={8}>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className={classes.signInCard}
          >
            <motion.h4 className={classes.cardHeader}>Sign In</motion.h4>
          </motion.div>
        </Grid>

        <Grid item xs={8} className="mt-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className={classes.signInCard}
          >
            <motion.h4 className={classes.cardHeader}>Sign Up</motion.h4>
          </motion.div>
        </Grid>

      </AnimateSharedLayout>
    </Grid>
  )
}
