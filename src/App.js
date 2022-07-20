import TryFetch from "./components/TryFetch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TryFetch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
