import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prospera from "./pages/Prospera";
import Holidays from "./pages/prospera/Holidays";
import Events from "./pages/prospera/Events";
import Gifting from "./pages/prospera/Gifting";
import Mice from "./pages/prospera/Mice";
import ProsperaLayout from "./pages/prospera/ProsperaLayout";
import About from "./pages/prospera/About";
import Contact from "./pages/prospera/Contact";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prospera" element={<ProsperaLayout />}>
                    <Route index element={<Prospera />} />
                    <Route path="holidays" element={<Holidays />} />
                    <Route path="events" element={<Events />} />
                    <Route path="gifting" element={<Gifting />} />
                    <Route path="mice" element={<Mice />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
