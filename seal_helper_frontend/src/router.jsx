import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import HomePage from "./pages/HomePage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import AllSealsPage from "./pages/AllSealsPage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SealDetailComponent from "./components/seals/SealDetailComponent.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import BecomeVolunteerPage from "./pages/BecomeVolunteerPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "profile/edit", element: <EditProfilePage /> },
            { path: "seals", element: <AllSealsPage /> },
            { path: "seals/:id", element: <SealDetailComponent /> },
            { path: "/help/become-volunteer", element: <BecomeVolunteerPage /> }
        ],
    },
]);