import {Container, Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {useDeleteInstructorMutation, useGetAllInstructorsQuery} from "../redux/features/instructors/instructorsApi.js";
import {useState} from "react";
import AddInstructorModal from "../components/AddInstructorModal.jsx";
import EditInstructorsModal from "../components/EditInstructorsModal.jsx";
import DeleteInstructorModal from "../components/DeleteInstructorModal.jsx";

const ManageInstructors = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [deletedInstructor, setDeleteInstructor] = useState('')


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
        setEditModalOpen(true)
    }

    const {data: instructors} = useGetAllInstructorsQuery();

    const handleDeleteButton = (id) => {
        setDeleteInstructor(id)
        setDeleteModalOpen(true);
        setModalMessage("Are you sure, you want to delete this instructor?");
    }

    const [deleteInstructor] = useDeleteInstructorMutation()

    const handleConfirmDelete = async () => {
        const res = await deleteInstructor(deletedInstructor).unwrap();
        console.log('res', res)
        setDeleteModalOpen(false)
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {
                    instructors?.data.map((instructor, index) => (
                        <Grid item key={index}>
                            <Card sx={{width: 345}}>
                                <CardMedia
                                    sx={{height: 250}}
                                    image={instructor.imgURL}
                                    title={instructor.prof}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {instructor.prof}
                                    </Typography>
                                    <Typography variant="body2" color={'text.secondary'}>
                                        {instructor.desc}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color="success" onClick={() => setAddModalOpen(true)}>Add</Button>
                                    <Button color="warning" onClick={() => handleEditButton(instructor.id)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDeleteButton(instructor.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
            <AddInstructorModal open={isAddModalOpen} onClose={handleCloseAddModal}/>

            <EditInstructorsModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                instructorId={instructorId}
            />

            <DeleteInstructorModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirmDelete={handleConfirmDelete}
                modalMessage={modalMessage}
            />

        </Container>
    );
};

export default ManageInstructors;
