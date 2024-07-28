import './App.css'; // Ensure this is imported if you want to keep custom styles
import ErrorBoundary from './Error/error';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './login/loginForm';
import Error from './Error/errorPage';
import Dashboard from './dashboard/dashboard';
import PrivateRoute from './login/protectedRoute';
import { AuthProvider } from './login/authContext';
import DemoSocketComponent from './socketFiles/demoSocketComponent';
function App() {
  return (
    <>
      <ErrorBoundary>
      </ErrorBoundary>
      <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" default name="LoginCopy" element={<Login/>} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/socket" element={<DemoSocketComponent />}/>
                </Route>
                <Route path="/error" element={<Error/>} />
            </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;