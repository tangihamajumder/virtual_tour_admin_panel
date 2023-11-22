import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://virtual-tour-backend.vercel.app/api/v1/',
        baseUrl: 'http://localhost:8080/api/v1/',
    }),
    tagTypes: ['courses','instructors','testimonials'],
    endpoints: () => ({}),
});

export default api;
