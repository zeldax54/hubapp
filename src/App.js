import React from "react";
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Charge from './components/Charge'
import LoginDialog from "./components/LoginDialog";
import RegisterDialog from "./components/RegisterDialog";
import InfoDialog from "./components/InfoDialog";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grid container direction="column">
          <Grid item>
            <Navbar />
          </Grid>

          <Grid item container>
            <Grid item xs={1} sm={2} />
            <Grid item xs={12} sm={8}></Grid>

            <Grid item xs={1} sm={2} />
          </Grid>
          <Charge/>
          <LoginDialog />
          <RegisterDialog />
          <InfoDialog />
        </Grid>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
