import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ViewNotePage } from './Pages/ViewNotePage'
import { HomePage } from './Pages/HomePage';
import { Layout } from './components/Layout'
import { AddNotePage } from './Pages/AddNotePage'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='ViewNotePage' element={<ViewNotePage />} />
          <Route path='AddNotePage' element={<AddNotePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
