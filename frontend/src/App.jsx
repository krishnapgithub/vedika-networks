import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prospera from "./pages/Prospera";
import Holidays from "./pages/prospera/Holidays";
import Events from "./pages/prospera/Events";
import Gifting from "./pages/prospera/Gifting";
import Mice from "./pages/prospera/Mice";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prospera" element={<Prospera />} />
                <Route path="/prospera/holidays" element={<Holidays />} />
                <Route path="/prospera/events" element={<Events />} />
                <Route path="/prospera/gifting" element={<Gifting />} />
                <Route path="/prospera/mice" element={<Mice />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;