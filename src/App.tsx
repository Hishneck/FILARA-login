import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
// import Test from "./Pages/Test";

function App() {
  return (
      <Routes>
        <Route path="/homepage" element={<HomePage />}/>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
