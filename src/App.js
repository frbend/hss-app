import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from './Components/MapView';
import Devices from './Components/Devices';
import Layout from './Components/Layout';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<MapView />} />
              <Route path="devices" element={<Devices />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
