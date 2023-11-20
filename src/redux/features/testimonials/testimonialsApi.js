import api from "../../api/apiSlice.js";

const testimonialsApi = api.injectEndpoints({
    endpoints: build => ({
        getAllTestimonials: build.query({
            query: () => ({
                url: `/testimonials/all-testimonials`,
                method: "GET"
            }),
            providesTags: ['testimonials']
        }),
        addTestimonial: build.mutation({
            query: (data) => ({
                url: `/testimonials/add-testimonial`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['testimonials']
        })
    })
});

export const {
    useGetAllTestimonialsQuery,
    useAddTestimonialMutation
} = testimonialsApi
