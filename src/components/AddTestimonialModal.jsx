import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useAddTestimonialMutation} from "../redux/features/testimonials/testimonialsApi.js";
import {useState} from "react";
import axios from "axios";

const AddTestimonialModal = ({open, onClose}) => {
    const [testimonialDetails, setTestimonialDetails] = useState({
        imgURL: '',
        title: '',
        about: '',
        desc: ''
    })
    const [addTestimonial] = useAddTestimonialMutation();

    const handleFieldChange = (e) => {
        const {name, value} = e.target;
        setTestimonialDetails({...testimonialDetails, [name]: value});
    }

    const handleImage = (e) => {
        console.log(e.target.files);
        const imgData = new FormData();
        imgData.set('key', '3870c154d57c9cf79d3e734926dc16fe');
        imgData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setTestimonialDetails({...testimonialDetails, imgURL: response.data.data.display_url});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = async () => {
        const res = await addTestimonial(testimonialDetails).unwrap();
        console.log('res', res)
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add new course</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{mt: 1}}>
                    <Grid item xs={12}>
                        <TextField
                            name="file"
                            type={'file'}
                            onChange={handleImage}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            value={testimonialDetails.title}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="about"
                            label="About"
                            value={testimonialDetails.about}
                            onChange={handleFieldChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="desc"
                            label="Description"
                            value={testimonialDetails.desc}
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

export default AddTestimonialModal;
