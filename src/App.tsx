import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import Home from "./pages/home";
import EditDetails from "./pages/editDetails";
import Navbar from "./components/navbar/navbar";
import Movies from "./pages/movies";

const { Header } = Layout;

function App() {
  return (
    <>
      <Header className="navbar_color">
        <Navbar />
      </Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditDetails />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
