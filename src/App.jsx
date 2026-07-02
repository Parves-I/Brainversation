import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Submissions from './pages/Submissions';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </BrowserRouter>
  );
}
