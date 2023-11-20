import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container, Grid} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";

import AddCourseModal from "../components/AddCourseModal.jsx";
import EditCourseModal from "../components/EditCourseModal.jsx";
import DeleteCourseModal from "../components/DeleteCourseModal.jsx";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import {useDeleteCoursesMutation, useGetAllCoursesQuery} from "../redux/features/courses/coursesApi.js";


const ManageCourses = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [courseId, setCourseId] = useState('');
    const [deletedCourse, setDeletedCourse] = useState('')

    const {data: courses} = useGetAllCoursesQuery({});
    const [deleteCourse] = useDeleteCoursesMutation()
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
        setCourseId(id);
        setEditModalOpen(true)
    }

    const handleDeleteButton = (id) => {
        setDeletedCourse(id)
        setDeleteModalOpen(true);
        setModalMessage("Are you sure, you want to delete this course?");
    }

    const handleConfirmDelete = async () => {
        const res = await deleteCourse(deletedCourse).unwrap();
        console.log('res', res)
        setDeleteModalOpen(false)
    }
    return (
        <Container>
            <Grid container>
                {
                    courses?.data?.map((course, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{maxWidth: 345}}>
                                <CardMedia
                                    sx={{height: 250}}
                                    image={course.imgURL}
                                    title={course.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.title}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="div" color="text.secondary">
                                        {course.prof}
                                    </Typography>
                                    <Typography variant="body2" sx={{mb: 3}}>
                                        {course.desc}
                                    </Typography>

                                    <Grid container spacing={4}>
                                        <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                                            <Box sx={{display: 'flex', mr: 1}}>
                                                <PeopleAltIcon/>
                                            </Box>
                                            <Box>
                                                {course.students}
                                            </Box>
                                        </Grid>
                                        <Grid item
                                              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Box sx={{display: 'flex', mr: 1}}>
                                                <HourglassTopRoundedIcon/>
                                            </Box>
                                            <Box>
                                                2 Years
                                            </Box>
                                        </Grid>
                                        <Grid item
                                              sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Box sx={{display: 'flex', mr: 1}}>
                                                <AttachMoneyRoundedIcon/>
                                            </Box>
                                            <Box>
                                                9,999
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button color="success" onClick={() => setAddModalOpen(true)}>Add</Button>
                                    <Button color="warning" onClick={() => handleEditButton(course.id)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDeleteButton(course.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
                <AddCourseModal
                    open={isAddModalOpen}
                    onClose={handleCloseAddModal}
                />

                <EditCourseModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    courseId={courseId}
                />

                <DeleteCourseModal
                    open={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    onConfirmDelete={handleConfirmDelete}
                    modalMessage={modalMessage}
                />
            </Grid>
        </Container>
    );
};

export default ManageCourses;