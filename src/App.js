import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootstrapNan from "./components/components/BootstrapNav";
import SuperProvider from "./contexts/SuperProvider";

function App() {
    return (
        <SuperProvider>
            <BrowserRouter>
                <BootstrapNan />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </SuperProvider>
    );
}

export default App;
