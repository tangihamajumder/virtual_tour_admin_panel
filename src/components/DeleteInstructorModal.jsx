import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const DeleteInstructorModal = ({openModal, onClose, modalMessage, onConfirmDelete}) => {
    return (
        <Dialog open={openModal} onClose={onClose}>
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
