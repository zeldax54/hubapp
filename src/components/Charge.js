import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
     zIndex: theme.zIndex.drawer + 2,
     color: "#fff",
  },
}));

const Charge = ({
    openCharge
  })   => {
  const classes = useStyles();

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleToggle = () => {
  //     setOpen(!open);
  //   };
  console.log(openCharge);  
  return (
     
    <div>
      <Backdrop className={classes.backdrop} open={openCharge}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

const mapStateToProps = (state) => ({
    openCharge: state.openCharge,
});
const mapDispachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispachToProps)(Charge);
