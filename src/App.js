import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootstrapNan from "./components/components/BootstrapNav";
import SuperProvider from "./contexts/SuperProvider";

function App() {
    return (
        <BrowserRouter>
            <SuperProvider>
                <BootstrapNan />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </SuperProvider>
        </BrowserRouter>
    );
}

export default App;
