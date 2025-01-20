
import { Provider } from "./components/ui/provider"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NoPage from "./pages/NoPage";
import RealTimeToolPage from "./pages/RealTimeTool";
import InfoPage from "./pages/InfoPage";
import ProgressPage from "./pages/ProgressPage";
function App() {
  return (
    <Provider>
    <BrowserRouter>
      <Routes>
      <Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/information" element={<InfoPage/>}></Route>
        <Route path="/progress" element={<ProgressPage/>}></Route>
        <Route path="/real-time" element={<RealTimeToolPage/>}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
