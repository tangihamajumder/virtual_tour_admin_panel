import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const CustomSnackBar = ({open, setOpen, message, severity}) => {

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;