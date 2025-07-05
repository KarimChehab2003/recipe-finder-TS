import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/recipes/:id" element={<RecipeDetails/>} />
            </Routes>
        </Router>
    );
}

export default App;