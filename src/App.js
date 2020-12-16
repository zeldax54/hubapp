import React from 'react';
import { Grid } from '@material-ui/core';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = ()=>{
  return ( 
    <BrowserRouter>
  <Grid container direction="column">
    <Grid item>
      <Navbar/>      
    </Grid>

    <Grid item container>
    <Grid item xs={1} sm={2}/>
    <Grid item xs={12} sm={8}>

    </Grid>

  
    <Grid item xs={1} sm={2}/>

      </Grid>

    </Grid>
    </BrowserRouter>
  );
}



export default App;
