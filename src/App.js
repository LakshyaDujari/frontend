import './App.css'; // Ensure this is imported if you want to keep custom styles
import ErrorBoundary from './Error/error';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from './Error/errorPage';
import Dashboard from './dashboard/dashboard';
import PrivateRoute from './login/protectedRoute';
import { AuthProvider } from './login/authContext';
import NewLoginForm from './login/newLoginForm';
function App() {
  return (
    <>
      <ErrorBoundary>
      </ErrorBoundary>
      <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" default name="Login" element={<NewLoginForm/>} />
                {/* <Route path="/newLogin" default name="LoginCopy" element={<NewLoginForm/>} /> */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/socket" element={<DemoSocketComponent />}/> */}
                </Route>
                <Route path="/error" element={<Error/>} />
            </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;