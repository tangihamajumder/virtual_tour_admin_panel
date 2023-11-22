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
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "../redux/features/courses/coursesApi.js";
import CustomSnackBar from "./CustomSnackbar.jsx";

const EditCourseModal = ({ openModal, onClose, courseId }) => {
  const [courseDetails, setCourseDetails] = useState({
    imgURL: "",
    title: "",
    prof: "",
    students: "",
    desc: "",
  });
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const { data: courseData } = useGetCourseByIdQuery(courseId);

  useEffect(() => {
    setCourseDetails({
      imgURL: courseData?.data.imgURL,
      title: courseData?.data.title,
      prof: courseData?.data.prof,
      students: courseData?.data.students,
      desc: courseData?.data.desc,
    });
  }, [courseData]);

  const handleImage = (e) => {
    const imgData = new FormData();
    imgData.set("key", "cdff362f40a57b4fa331024ac0638abd");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        setCourseDetails({
          ...courseDetails,
          imgURL: response.data.data.display_url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [editCourse] = useEditCourseMutation();

  const handleSubmit = async () => {
    const data = {
      id: courseId,
      payload: courseDetails,
    };
    const res = await editCourse(data).unwrap();
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
    setCourseDetails({ ...courseDetails, [name]: value });
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
            <TextField name="imgURL" value={courseDetails.imgURL} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              value={courseDetails.title}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="prof"
              value={courseDetails.prof}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="desc"
              multiline
              maxRows={3}
              value={courseDetails.desc}
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

export default EditCourseModal;
