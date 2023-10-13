
import './App.css';
import MainPage from './pages/mainPage/MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
