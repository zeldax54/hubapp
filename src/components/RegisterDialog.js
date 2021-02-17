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
import ReCAPTCHA from "react-google-recaptcha";
import API from "./API";

const useStyles = makeStyles((theme) => ({
  separator: {
    "margin-top": "10px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));



const RegisterDialog = ({
  openRegisterDialog,
  handleClose,
  urlMidgardRegister,
  handleOpenInfo,
  handleOpenLogin
}) => {
  const classes = useStyles();
  const [sendDisabled, setSendDisabled] = useState(true);
  const [userValues, setUserValues] = useState({
    emailerror:false,
    passworderror:false,
    confirmedPassworderror:false
  });
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [confirmedPassworderror, setConfirmedPassworderror] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('La contraseña es requerida');
  const [emailErrorText, setEmailErrorText] = useState('El email es requerido');
  const [disabledSend, setDisabledSend] = useState(false);
  const urlRegister = process.env.REACT_APP_URL_MIDGARD + urlMidgardRegister;


  const setValues = (valor,dato) => {
    if(valor==='email')
      userValues.email=dato;
    if(valor==='password')
      userValues.password=dato;
    if(valor==='confirmedPassword')
      userValues.confirmedPassword=dato;   
    let emailerror = userValues.email===undefined || userValues.email.trim()==="" ? true : false; 
    let passworderror = userValues.password===undefined || userValues.password.trim()==="" ? true : false;
    let confirmedPassworderror = userValues.confirmedPassword===undefined||userValues.confirmedPassword.trim()==="" ? true : false;
    setUserValues(userValues);
    setEmailerror(emailerror);
    let disabledbtn = false;
   
    if(userValues.password !== userValues.confirmedPassword){  
     
       setPasswordErrorText('Las contraseñas deben coincidir');
       disabledbtn=true;
       passworderror=true;
       confirmedPassworderror=true;
    }
    setPassworderror(passworderror);
    setConfirmedPassworderror(confirmedPassworderror);
    setDisabledSend(disabledbtn);

   }

  return (
    <div>
      <Dialog
        open={openRegisterDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registrarse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para suscribirse a este sitio, por favor complete estos datos.
            Le enviaremos actualizaciones ocasionalmente.
          </DialogContentText>
            
            <div className={classes.separator}>
              <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                fullWidth              
                onChange={(e) => setValues('email',e.target.value)}
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
              onChange={(e) => setValues('password',e.target.value)}
              error = {passworderror}
              helperText = { passworderror && passwordErrorText }   
            />
          </div>
          <div className={classes.separator}>
            <TextField
              required
              id="confirmpassword"
              label="Repetir Password"
              autoComplete="current-password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => setValues('confirmedPassword',e.target.value)}
              error = {confirmedPassworderror}
              helperText = { confirmedPassworderror && passwordErrorText }   
            />
          </div>
          {sendDisabled && (
            <div className={classes.separator}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                onChange={() => setSendDisabled(false)}
                onExpired={() => {
                  setSendDisabled(true);
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {!sendDisabled && (
            <>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setDisabledSend(true);
                  let jsonNewUser = {
                    email: userValues.email,
                    password: userValues.password,
                    confirmedPassword: userValues.confirmedPassword,
                  };
                  new API()
                    .registerUser(jsonNewUser, urlRegister)
                    .then((response) => {
                      console.log(response);
                      if(response.code === 500)
                         handleOpenInfo(response.message);     
                      else{

                        handleOpenLogin(userValues.email);
                      }
                      
                         setDisabledSend(false);
                    });
                   }}
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                disabled ={disabledSend}  
              >
                Registrarse
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  openRegisterDialog: state.openRegisterDialog,
  urlMidgardRegister: state.urlMidgardRegister,
});

const mapDispachToProps = (dispatch) => ({
  handleClose() {
    dispatch({
      type: "CLOSE_REGISTER_DIALOG",
    });
  },
  handleOpenInfo(message){
    dispatch({
      type: "OPEN_INFO_DIALOG",
      data:message
    });
  },
  handleOpenLogin(userEmail){
    this.handleClose();
    dispatch({
      type: "OPEN_LOGIN_DIALOG",
      data:userEmail      
    });
  }
});

export default connect(mapStateToProps, mapDispachToProps)(RegisterDialog);
