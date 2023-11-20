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
import { useAddCoursesMutation } from "../redux/features/courses/coursesApi.js";

const AddCourseModal = ({ open, onClose }) => {
  const [courseDetails, setCourseDetails] = useState({
    imgURL: "",
    title: "",
    prof: "",
    students: "",
    desc: "",
  });

  const [addCourse] = useAddCoursesMutation();

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
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
        setCourseDetails({
          ...courseDetails,
          imgURL: response.data.data.display_url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    const res = await addCourse(courseDetails).unwrap();
    console.log("res", res);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
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
              name="title"
              label="Title"
              value={courseDetails.title}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="prof"
              label="Professor"
              value={courseDetails.prof}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="students"
              label="Students"
              value={courseDetails.students}
              onChange={handleFieldChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="desc"
              label="Description"
              multiline
              maxRows={4}
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
    </Dialog>
  );
};

export default AddCourseModal;
