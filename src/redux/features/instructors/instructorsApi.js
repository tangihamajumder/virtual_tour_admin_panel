import api from "../../api/apiSlice.js";

const instructorsApi = api.injectEndpoints({
    endpoints: build => ({
        getAllInstructors: build.query({
            query: () => ({
                url: `/instructors/all-instructors`,
                method: "GET"
            }),
            providesTags: ['instructors']
        }),
        getInstructorById: build.query({
            query: (id) => ({
                url: `/instructors/${id}`,
                method: "GET"
            }),
            providesTags: ['instructors']
        }),
        addInstructor: build.mutation({
            query: (data) => ({
                url: `/instructors/add-instructor`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['instructors']
        }),
        editInstructor: build.mutation({
            query: ({id, payload}) => ({
                url: `/instructors/update-instructor/${id}`,
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ['instructors']
        }),
        deleteInstructor: build.mutation({
            query: (id) => ({
                url: `/instructors/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['instructors']
        })
    })
});

export const {
    useGetAllInstructorsQuery,
    useGetInstructorByIdQuery,
    useAddInstructorMutation,
    useEditInstructorMutation,
    useDeleteInstructorMutation
} = instructorsApi;
