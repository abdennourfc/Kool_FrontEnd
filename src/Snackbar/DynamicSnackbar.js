import { Snackbar, Slide} from "@mui/material";
import {CheckCircle as SuccessIcon, Error as ErrorIcon} from "@mui/icons-material";

export default function DynamicSnackbar({message, open, type, onClose}) {

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
      }


    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical : "top", horizontal : "right" }}
            autoHideDuration={5000}
            onClose={onClose}
            TransitionComponent={SlideTransition}>
                <div className={type === "error" ? "errorSnackbarContainer" : "successSnackbarContainer"}>
                    {type === "error" ? <ErrorIcon style={{marginRight : "10px"}}/> : <SuccessIcon style={{marginRight : "10px"}}/>}
                    <span>{message}</span>
                </div>
        </Snackbar>
    );
}