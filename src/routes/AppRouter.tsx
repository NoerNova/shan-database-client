import { Route } from 'react-router-dom';
import { ContactList, Home, Login, Logout, StaffList } from "pages";
import { ProtectedRoute } from "routes/ProtectedRoute";

const AppRouter = () => {
  return (
    <div>
      <Route index element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/contact-list" element={
        <ProtectedRoute>
          <ContactList />
        </ProtectedRoute>
      } />
      <Route path="/staff-list" element={
        <ProtectedRoute>
          <StaffList />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <Login />
      } />
      <Route path="/logout" element={<Logout />} />
    </div>
  )
}

export default AppRouter;
