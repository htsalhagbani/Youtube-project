import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App"; 
import ErrorPage from "./error";
import Home from "../components/Home";
import ViedoRun from "../components/ViedoRun";
import Login from "../components/login";
import Signup from "../components/signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        errorElement: <ErrorPage />,
        children: [
            {
                index: true, 
                element: <Home />,
            },
            {
                path: "/video/:videoId", 
                element: <ViedoRun />,
            },
           {  path:"/category/:categoryId" ,
            element:<Home /> ,
           },
           {  path:"/login" ,
            element:<Login /> ,
           },
           {  path:"/signup" ,
            element:<Signup/> ,
           },

        ],
    },
]);

export default router;
