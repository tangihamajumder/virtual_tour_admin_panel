import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useAddInstructorMutation } from "../redux/features/instructors/instructorsApi.js";
import CustomSnackBar from "./CustomSnackbar.jsx";

const AddInstructorModal = ({ openModal, onClose }) => {
  const [instructorDetails, setInstructorDetails] = useState({
    imgURL: "",
    prof: "",
    desc: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const [addInstructor] = useAddInstructorMutation();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInstructorDetails({ ...instructorDetails, [name]: value });
  };
  const handleImage = (e) => {
    console.log(e.target.files);
    const imgData = new FormData();
    imgData.set("key", "cdff362f40a57b4fa331024ac0638abd");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        console.log(response.data.data.display_url);
        setInstructorDetails({
          ...instructorDetails,
          imgURL: response.data.data.display_url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    const res = await addInstructor(instructorDetails).unwrap();
    console.log("res", res);
    if (res?.success) {
      setOpen(true);
      setSeverity("success");
      setSnackbarMessage(res?.message);
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setOpen(true);
      setSeverity("error");
      setSnackbarMessage("Something went wrong");
    }
  };
  return (
    <Dialog open={openModal} onClose={onClose}>
      <DialogTitle>Add new course</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              name="file"
              type={"file"}
              onChange={handleImage}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="prof"
              label="Professor Name"
              value={instructorDetails.prof}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="desc"
              label="Dsignation"
              value={instructorDetails.title}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
      <CustomSnackBar
        open={open}
        setOpen={setOpen}
        message={snackbarMessage}
        severity={severity}
      />
    </Dialog>
  );
};

export default AddInstructorModal;
