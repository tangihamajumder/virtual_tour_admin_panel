import { Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AddTestimonialModal from "../components/AddTestimonialModal.jsx";
import { useGetAllTestimonialsQuery } from "../redux/features/testimonials/testimonialsApi.js";

const ManageTestimonials = () => {
  const { data: testimonials } = useGetAllTestimonialsQuery();
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };
  const styles = {
    media: {
      height: 0,
      paddingTop: "100%", // 16:9,
      marginTop: "10%",
    },
  };
  return (
    <Container>
      <Button
        size="large"
        variant="contained"
        sx={{ mb: 4 }}
        onClick={() => setAddModalOpen(true)}
      >
        Add Testimonials
      </Button>
      <Grid container spacing={2}>
        {testimonials?.data.map((testimonial, index) => (
          <Grid item key={index}>
            <Card sx={{ width: 345 }}>
              <CardMedia
                sx={{ height: 300 }}
                image={testimonial.imgURL}
                title={testimonial.prof}
                style={styles.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {testimonial.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  color={"text.secondary"}
                >
                  {testimonial.about}
                </Typography>
                <Typography variant="body2">{testimonial.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddTestimonialModal
        openModal={isAddModalOpen}
        onClose={handleCloseAddModal}
      />
    </Container>
  );
};

export default ManageTestimonials;
