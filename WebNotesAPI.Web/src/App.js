import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { ViewNotePage } from './Pages/ViewNotePage'
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import { SigninPage } from './Pages/SigninPage';
import { Layout } from './components/Layout'
import { NotFoundPage } from './Pages/NotFoundPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='ViewNotePage' element={<ViewNotePage />} />
          <Route path='LoginPage' element={<LoginPage />} />
          <Route path='SigninPage' element={<SigninPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
