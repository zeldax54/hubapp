import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Hidden,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";
import { Link } from "react-router-dom";
import MyDrawer from "./MyDrawer";

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

const menuItems = () => [
  {
    link: "/",
    name: "Home",
    icon: <HomeIcon className="text-white" />,
  },
  {
    link: "/blog",
    name: "Blog",
    icon: <BookIcon className="text-white" />,
  },
  {
    name: "Register",
    //  onClick: openRegisterDialog,
    icon: <HowToRegIcon className="text-white" />,
  },
  {
    name: "Login",
    // onClick: openLoginDialog,
    icon: <LockOpenIcon className="text-white" />,
  },
];

const Navbar = () => {
  const classes = useStyles();
  const menu = menuItems();

  const OpenMovileMenu = () => {
    alert("asd");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.TypographyStyles}>
            This is a test RemateApp
          </Typography>
          <Hidden smDown>
            {menu.map((element) => {
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
                  //   onClick={element.onClick}
                  classes={{ text: classes.menuButtonText }}
                  key={element.name}
                >
                  {element.name}
                </Button>
              );
            })}
          </Hidden>
          <MyDrawer elementos={menu} anchor="right" />
        </Toolbar>
      </AppBar>     
    </>
  );
};

export default Navbar;
