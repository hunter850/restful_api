import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperProvider from "./contexts/SuperProvider";
import BootstrapNav from "./components/components/BootstrapNav";
import Home from "./components/Home";
import Login from "./components/Login";
import TryFetch from "./components/TryFetch";
import CanvasDraw from "./components/CanvasDraw";

function App() {
    return (
        <BrowserRouter>
            <SuperProvider>
                <BootstrapNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<TryFetch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/canvas_draw" element={<CanvasDraw />} />
                </Routes>
            </SuperProvider>
        </BrowserRouter>
    );
}

export default App;
