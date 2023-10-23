import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './App.css';

//layouts
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

//components
import LandingPage from './components/LandingPage';
import TeacherHome from './components/TeacherHome';
import CreateCourse from './components/CreateCourse';
import AdminSignIn from './components/AdminSignIn';
import AdminCourseReports from './components/AdminCourseReports';
import AdminTeacherApplications from './components/AdminTeacherApplications';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AboutUs from './components/UsAbout';
import FAQs from './components/FAQs';
import UserSettings from './components/UserSettings';
import EditCourse from './components/EditCourse';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      
      <Route index element={<LandingPage />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="signin" element={<SignIn />}></Route>
      <Route path="faqs" element={<FAQs />}></Route>
      <Route path="aboutus" element={<AboutUs />}></Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="teacherHome" element={<TeacherHome />}></Route>
        <Route path="createcourse" element={<CreateCourse />}></Route>
        <Route path="userSettings" element={<UserSettings />}></Route>
        <Route path="editCourse" element={<EditCourse />}></Route>
      </Route>

      <Route path="adminsignin" element={<AdminSignIn />}></Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminCourseReports />}></Route>
        <Route path="teacherApplications" element={<AdminTeacherApplications />}></Route>
      </Route>

    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
