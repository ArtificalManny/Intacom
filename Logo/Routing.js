import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ProjectMainPage from "./ProjectMainPage"; //Create a ProjectMainPage component

function MainRouter() {
    return (
        <Router>
            <Routes>
                <Rotue path="/" element={<App />} />
                <Route path="/projects/:projectId" element={<ProjectMainPage />} /> 
            </Routes>
        </Router>
    );
}

export default MainRouter;