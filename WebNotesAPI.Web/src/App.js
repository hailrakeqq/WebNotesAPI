import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { ViewNotePage } from './Pages/ViewNotePage'
import { HomePage } from './Pages/HomePage';
import { Layout } from './components/Layout'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='ViewNotePage' element={<ViewNotePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
