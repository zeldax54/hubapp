import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";


const InfoDialog = ({
    infoDialogMsj,
    openInfDialog,   
    handleClose 
  }) => {
   
    return (
        <div>
          <Dialog
            open={openInfDialog}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Información</DialogTitle>
            <DialogContent>
              <DialogContentText>
               {infoDialogMsj}
              </DialogContentText>                
               
            </DialogContent>
            <DialogActions>          
                <>
                  <Button onClick={handleClose} color="primary">
                    OK
                  </Button>               
                </>            
            </DialogActions>
          </Dialog>
        </div>
    )

  };

  const mapStateToProps = (state) => ({
    infoDialogMsj: state.infoDialogMsj,
    openInfDialog: state.openInfDialog,
  });
  
  const mapDispachToProps = (dispatch) => ({
    handleClose() {
      dispatch({
        type: "CLOSE_INFO_DIALOG",
      });
    },
  });

  export default connect(mapStateToProps, mapDispachToProps)(InfoDialog);
