import { createStore } from "redux";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import BookIcon from "@material-ui/icons/Book";

const initialState = {
  nvarMenuItems: [
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
      icon: <HowToRegIcon className="text-white" />,
    },
    {
      name: "Login",
      icon: <LockOpenIcon className="text-white" />,
    },
  ],
  navbarAnchor: "right",
  messageApp: "This is a Test Remate Web App",
  openLogindialog: false,
  openRegisterDialog:false,
  infoDialogMsj:"",
  openInfDialog:false,
  urlMidgardRegister:"user/Register",
  currentUser:{},
  openCharge:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        currentUser:{
           email:action.data,
           token:''
        }, 
        openLogindialog: true,       
      };
      case "Register":
        return {
          ...state,
          openRegisterDialog:true
        }
    case "CLOSE_LOGIN_DIALOG":
      return {
        ...state,
        openLogindialog: false,
      };
    case "CLOSE_REGISTER_DIALOG":
      return {
        ...state,
        openRegisterDialog: false,
      };       
      case "CLOSE_INFO_DIALOG":
      return {
        ...state,
        openInfDialog: false,
      };  
      case "OPEN_INFO_DIALOG":
      return {
        ...state,
        infoDialogMsj:action.data,
        openInfDialog: true,

      };
      case "TOGGLE_CHARGE":
        return {
          ...state,
          openCharge:!state.openCharge,
  
        };
    default:
      return state;
  }
};




export default createStore(reducer);
