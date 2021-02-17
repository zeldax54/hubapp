import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Hidden, List } from "@material-ui/core";
import {connect} from 'react-redux'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

//anchor 'left', 'right', 'top', 'bottom'
const  MyDrawer = ({nvarMenuItems,navbarAnchor,SendClick}) =>{
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
          onClick={toggleDrawer(navbarAnchor, true)}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Drawer
        anchor={navbarAnchor}
        open={state[navbarAnchor]}
        onClose={toggleDrawer(navbarAnchor, false)}
      >
        <div
          className={clsx(classes.list, {
            [classes.fullList]:
            navbarAnchor === "top" || navbarAnchor === "bottom",
          })}
          role="presentation"
          onClick={toggleDrawer(navbarAnchor, false)}
          onKeyDown={toggleDrawer(navbarAnchor, false)}
        >
          <List>
            {nvarMenuItems.map((elemento) => {
              return (
                <ListItem button key={elemento.name} onClick={()=>SendClick(elemento.name)}>
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

const mapStateToProps = state =>({
  nvarMenuItems:state.nvarMenuItems,
  navbarAnchor:state.navbarAnchor
})

const mapDispachToProps=dispatch=>({

  SendClick(name){
    dispatch({
      type:name      
    })
  }

})

export default connect (mapStateToProps,mapDispachToProps)(MyDrawer)
