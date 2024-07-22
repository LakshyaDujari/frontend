import './App.css'; // Ensure this is imported if you want to keep custom styles
import ErrorBoundary from './Error/error';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './login/loginForm';
import Error from './Error/errorPage';
import ProtectedRoute from './login/protectedRoute';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <>
      <ErrorBoundary>
      </ErrorBoundary>
      <Router>
            <Routes>
                <Route path="/" default name="LoginCopy" element={<Login/>} />
                <Route path="/" element={<ProtectedRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path="/error" element={<Error/>} />
            </Routes>
      </Router>
    </>
  );
}

export default App;