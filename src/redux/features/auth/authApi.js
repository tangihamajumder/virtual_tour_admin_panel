import api from "../../api/apiSlice.js";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        userSignUp: build.mutation({
            query: (data) => ({
                url: `/auth/sign-up`,
                method: 'POST',
                body: data,
            })
        }),
        userSignIn: build.mutation({
            query: (data) => ({
                url: `/auth/sign-in`,
                method: 'POST',
                body: data,
            })
        })
    }),
})

export const {useUserSignUpMutation, useUserSignInMutation} = authApi
