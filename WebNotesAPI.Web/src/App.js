import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { ViewNotePage } from './Pages/ViewNotePage'
import { LoginPage } from './Pages/LoginPage';
import { SigninPage } from './Pages/SigninPage';
import { UserManagePage } from './Pages/UserManagePage'
import { AdminPage } from './Pages/AdminPage';
import { Layout } from './components/Layout'
import { NotFoundPage } from './Pages/NotFoundPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<ViewNotePage />} />
          <Route path='LoginPage' element={<LoginPage />} />
          <Route path='SigninPage' element={<SigninPage />} />
          <Route path='UserManagePage' element={<UserManagePage />} />
          <Route path='AdminPage' element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
