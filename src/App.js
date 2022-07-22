import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BootstrapNan from "./components/components/BootstrapNav";
import ThemeProvider from "./contexts/ThemeProvider";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <BootstrapNan />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
