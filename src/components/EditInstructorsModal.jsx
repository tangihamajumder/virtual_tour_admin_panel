import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import axios from "axios";
import {useEditInstructorMutation, useGetInstructorByIdQuery} from "../redux/features/instructors/instructorsApi.js";

const EditInstructorsModal = ({open, onClose, instructorId}) => {
    const [instructorDetails, setInstructorDetails] = useState({
        imgURL: '',
        prof: '',
        desc: '',
    });

    const {data: instructorDetail} = useGetInstructorByIdQuery(instructorId);

    useEffect(() => {
        setInstructorDetails({
            imgURL: instructorDetail?.data.imgURL,
            prof: instructorDetail?.data.prof,
            desc: instructorDetail?.data.desc
        })
    }, [instructorDetail]);

    const handleImage = (e) => {
        const imgData = new FormData();
        imgData.set('key', '3870c154d57c9cf79d3e734926dc16fe');
        imgData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                setInstructorDetails({...instructorDetails, imgURL: response.data.data.display_url});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const [editInstructor] = useEditInstructorMutation()

    const handleSubmit = async () => {
        const data = {
            id: instructorId,
            payload: instructorDetails
        }
        const res = await editInstructor(data).unwrap();
        onClose();
    }

    const handleFieldChange = (e) => {
        const {name, value} = e.target;
        setInstructorDetails({...instructorDetails, [name]: value});
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit course Information</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{mt: 1}}>
                    <Grid item xs={12}>
                        <TextField
                            name="imgURL"
                            type='File'
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
        </Dialog>
    );
};

export default EditInstructorsModal;
