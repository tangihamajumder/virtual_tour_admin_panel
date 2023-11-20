import api from "../../api/apiSlice.js";


const coursesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query({
            query: () => ({
                url: `/courses/all-courses`,
                method: "GET"
            }),
            providesTags: ['courses']
        }),
        getCourseById: build.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "GET"
            }),
            providesTags: ['courses']
        }),
        addCourses: build.mutation({
            query: (data) => ({
                url: `/courses/create-course`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['courses']
        }),
        editCourse: build.mutation({
            query: ({id, payload}) => ({
                url: `/courses/update-course/${id}`,
                method: "PATCH",
                body: payload
            }),
            invalidatesTags: ['courses']
        }),
        deleteCourses: build.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['courses']
        })
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useAddCoursesMutation,
    useEditCourseMutation,
    useDeleteCoursesMutation
} = coursesApi;
