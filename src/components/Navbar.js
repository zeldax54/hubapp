import {
  AppBar,
  Toolbar,
  Typography,
  Button,  
  Hidden,  
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MyDrawer from "./MyDrawer";
import {connect} from 'react-redux'

const useStyles = makeStyles({
  TypographyStyles: {
    flex: 1,
  },
  noDecoration: {
    "text-decoration": "none",
  },
  menuButtonText: {
    color: "#e7d9de",
  },
});


const Navbar = ({nvarMenuItems,messageApp,SendClick}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.TypographyStyles}>
            {messageApp}
          </Typography>
          <Hidden smDown>
            {nvarMenuItems.map((element) => {
              if (element.link) {
                return (
                  <Link
                    key={element.name}
                    to={element.link}
                    className={classes.noDecoration}
                  >
                    <Button
                      color="secondary"
                      size="large"
                      classes={{ text: classes.menuButtonText }}
                    >
                      {element.name}
                    </Button>
                  </Link>
                );
              }
              return (
                <Button
                  color="secondary"
                  size="large"
                   onClick={()=>SendClick(element.name)}
                   classes={{ text: classes.menuButtonText }}
                   key={element.name}
                  >
                  {element.name}
                </Button>
              );
            })}
          </Hidden>
          <MyDrawer />
        </Toolbar>
      </AppBar>     
    </>
  );
};

const mapStateToProps = state =>({
  nvarMenuItems:state.nvarMenuItems, 
  messageApp:state.messageApp
})

const mapDispachToProps=dispatch=>({
  SendClick(name){
    dispatch({
      type:name      
    })
  }
   

})

export default connect(mapStateToProps,mapDispachToProps)(Navbar);
