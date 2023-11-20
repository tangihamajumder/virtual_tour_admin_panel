import {Container, Grid} from "@mui/material";
import {useGetAllTestimonialsQuery} from "../redux/features/testimonials/testimonialsApi.js";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import AddTestimonialModal from "../components/AddTestimonialModal.jsx";

const ManageTestimonials = () => {
    const {data: testimonials} = useGetAllTestimonialsQuery();
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                {
                    testimonials?.data.map((testimonial, index) => (
                        <Grid item key={index}>
                            <Card sx={{width: 345}}>
                                <CardMedia
                                    sx={{height: 250}}
                                    image={testimonial.imgURL}
                                    title={testimonial.prof}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {testimonial.title}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="div"
                                                color={'text.secondary'}>
                                        {testimonial.about}
                                    </Typography>
                                    <Typography variant="body2">
                                        {testimonial.desc}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color="success" onClick={() => setAddModalOpen(true)}>Add</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <AddTestimonialModal open={isAddModalOpen} onClose={handleCloseAddModal}/>
        </Container>
    );
};

export default ManageTestimonials;
