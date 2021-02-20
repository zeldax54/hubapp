import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  separator: {
    "margin-top": "10px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const LoginDialog = ({ openLogindialog, handleClose }) => {
  const classes = useStyles();
 
  const [email, setEmail] = useState('');
  const [emailerror, setEmailError] = useState(false);
  const [emailErrorText] = useState('El email es requerido');
 
  const [password, setPassword] = useState('');
  const [passworderror, setPasswordError] = useState(false);
  const [passwordErrorText] = useState('La contraseña es requerida');
  const [disableSendBtn, setDisableSendBtn] = useState(false);

  const SetValues = (field,value)=>{
    if(field==="email"){
      setEmail(value);
      setEmailError(value === undefined || value.trim() === "");    
    }       
    if(field==="password"){
      setPassword(value);   
      setPasswordError(value === undefined || value.trim() === "");    
    } 
    setDisableSendBtn(value === undefined || value.trim() === ""); 
  }
  return (
    <div>
      <span> {openLogindialog}</span>
      <Dialog
       disableBackdropClick
       disableEscapeKeyDown
        open={openLogindialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese tecleando su usuario y contraseña.
          </DialogContentText>
          <div className={classes.separator}>
              <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                fullWidth              
                onChange={(e) => SetValues('email',e.target.value)}
                error = { emailerror }
                helperText = { emailerror && emailErrorText}   
                       
              />
            </div>   
            <div className={classes.separator}>
            <TextField
              required
              id="password"
              label="Password"
              autoComplete="current-password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => SetValues('password',e.target.value)}
              error = {passworderror}
              helperText = { passworderror && passwordErrorText }   
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        
          <Button
        variant="contained"
        color="primary"
        className={classes.button}        
        disabled={disableSendBtn}
        >
        Login
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  openLogindialog: state.openLogindialog,
});

const mapDispachToProps = (dispatch) => ({
  handleClose() {
    dispatch({
      type: "CLOSE_LOGIN_DIALOG",
    });
  },
});

export default connect(mapStateToProps, mapDispachToProps)(LoginDialog);
