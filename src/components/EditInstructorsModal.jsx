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
import { useEffect, useState } from "react";
import {
  useEditInstructorMutation,
  useGetInstructorByIdQuery,
} from "../redux/features/instructors/instructorsApi.js";
import CustomSnackBar from "./CustomSnackbar.jsx";

const EditInstructorsModal = ({ openModal, onClose, instructorId }) => {
  const [instructorDetails, setInstructorDetails] = useState({
    imgURL: "",
    prof: "",
    desc: "",
  });
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const { data: instructorDetail } = useGetInstructorByIdQuery(instructorId);

  useEffect(() => {
    setInstructorDetails({
      imgURL: instructorDetail?.data.imgURL,
      prof: instructorDetail?.data.prof,
      desc: instructorDetail?.data.desc,
    });
  }, [instructorDetail]);

  const handleImage = (e) => {
    const imgData = new FormData();
    imgData.set("key", "cdff362f40a57b4fa331024ac0638abd");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        setInstructorDetails({
          ...instructorDetails,
          imgURL: response.data.data.display_url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [editInstructor] = useEditInstructorMutation();

  const handleSubmit = async () => {
    const data = {
      id: instructorId,
      payload: instructorDetails,
    };
    const res = await editInstructor(data).unwrap();
    if (res?.success) {
      setOpen(true);
      setSeverity("success");
      setSnackbarMessage(res?.message);
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setOpen(true);
      setSeverity("error");
      setSnackbarMessage("Something went wrong");
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInstructorDetails({ ...instructorDetails, [name]: value });
  };

  return (
    <Dialog open={openModal} onClose={onClose}>
      <DialogTitle>Edit course Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              name="imgURL"
              type="File"
              onChange={handleImage}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="imgURL"
              label="Image Url"
              value={instructorDetails.imgURL}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="prof"
              label="Professor"
              value={instructorDetails.prof}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="desc"
              label="Designation"
              multiline
              maxRows={3}
              value={instructorDetails.desc}
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

export default EditInstructorsModal;
