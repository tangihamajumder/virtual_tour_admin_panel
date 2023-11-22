import { Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddInstructorModal from "../components/AddInstructorModal.jsx";
import CustomSnackBar from "../components/CustomSnackbar.jsx";
import DeleteInstructorModal from "../components/DeleteInstructorModal.jsx";
import EditInstructorsModal from "../components/EditInstructorsModal.jsx";
import {
  useDeleteInstructorMutation,
  useGetAllInstructorsQuery,
} from "../redux/features/instructors/instructorsApi.js";

const ManageInstructors = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [deletedInstructor, setDeleteInstructor] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleEditButton = (id) => {
    setInstructorId(id);
    setEditModalOpen(true);
  };

  const { data: instructors } = useGetAllInstructorsQuery();

  const handleDeleteButton = (id) => {
    setDeleteInstructor(id);
    setDeleteModalOpen(true);
    setModalMessage("Are you sure, you want to delete this instructor?");
  };

  const [deleteInstructor] = useDeleteInstructorMutation();

  const handleConfirmDelete = async () => {
    const res = await deleteInstructor(deletedInstructor).unwrap();
    if (res?.success) {
      setOpenSnackbar(true);
      setSeverity("success");
      setSnackbarMessage(res?.message);
      setTimeout(() => {
        setDeleteModalOpen(false);
      }, 500);
    } else {
      setOpenSnackbar(true);
      setSeverity("error");
      setSnackbarMessage("Something went wrong");
      setDeleteModalOpen(false);
    }
  };

  return (
    <Container>
      <Button
        size="large"
        variant="contained"
        sx={{ mb: 4 }}
        onClick={() => setAddModalOpen(true)}
      >
        Add Instructor
      </Button>

      <Grid container spacing={3}>
        {instructors?.data.map((instructor, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 345 }}>
              <CardMedia
                sx={{ height: 250 }}
                image={instructor.imgURL}
                title={instructor.prof}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {instructor.prof}
                </Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {instructor.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="warning"
                  onClick={() => handleEditButton(instructor.id)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDeleteButton(instructor.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddInstructorModal
        openModal={isAddModalOpen}
        onClose={handleCloseAddModal}
      />

      <EditInstructorsModal
        openModal={isEditModalOpen}
        onClose={handleCloseEditModal}
        instructorId={instructorId}
      />

      <DeleteInstructorModal
        openModal={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
        modalMessage={modalMessage}
      />

      <CustomSnackBar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={snackbarMessage}
        severity={severity}
      />
    </Container>
  );
};

export default ManageInstructors;
