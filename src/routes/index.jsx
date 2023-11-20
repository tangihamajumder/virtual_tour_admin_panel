import {createBrowserRouter} from 'react-router-dom';
import App from "../App.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import ManageCourses from "../pages/ManageCourses.jsx";
import ManageInstructors from "../pages/ManageInstructors.jsx";
import ManageTestimonials from "../pages/ManageTestimonials.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <ManageCourses/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/manage-instructors',
                element: (
                    <ProtectedRoute>
                        <ManageInstructors/>
                    </ProtectedRoute>
                )
            }, {
                path: '/manage-testimonials',
                element: (
                    <ProtectedRoute>
                        <ManageTestimonials/>
                    </ProtectedRoute>
                )
            },
        ]
    },
    {
        path: '/sign-in',
        element: <SignIn/>,
    },
    {
        path: '/sign-up',
        element: <SignUp/>,
    }
])

export default routes;
