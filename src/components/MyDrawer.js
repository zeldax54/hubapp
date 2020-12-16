import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Hidden, List } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

//anchor 'left', 'right', 'top', 'bottom'
export default function MyDrawer(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Hidden mdUp>
        {" "}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(props.anchor, true)}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Drawer
        anchor={props.anchor}
        open={state[props.anchor]}
        onClose={toggleDrawer(props.anchor, false)}
      >
        <div
          className={clsx(classes.list, {
            [classes.fullList]:
              props.anchor === "top" || props.anchor === "bottom",
          })}
          role="presentation"
          onClick={toggleDrawer(props.anchor, false)}
          onKeyDown={toggleDrawer(props.anchor, false)}
        >
          <List>
            {props.elementos.map((elemento) => {
              return (
                <ListItem button key={elemento.name}>
                  {<ListItemIcon>{elemento.icon}</ListItemIcon>}
                  <ListItemText primary={elemento.name} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
}
