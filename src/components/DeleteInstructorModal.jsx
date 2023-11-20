import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
const DeleteInstructorModal = ({open, onClose, modalMessage, onConfirmDelete}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                {modalMessage}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirmDelete} color="error">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteInstructorModal;
