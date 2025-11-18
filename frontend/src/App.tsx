import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { StoryContext } from "./contexts/storyContext";
import { UserContext } from "./contexts/userContext";

import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";

import { Homepage } from "./pages/Homepage";
import { ViewStory } from "./pages/StoryManagement";
import { Grooming } from "./pages/Grooming";
import { Room } from "./pages/Room";
import { Configuration } from "./pages/Configuration";

function App() {
  const { currUserName } = useContext(UserContext);

  return (
    <div className="App">
      <NavigationBar user={currUserName}></NavigationBar>
      <Routes>
        {currUserName === "" ? (
          <Route path="/" element={<Homepage />}></Route>
        ) : (
          <Route path="/" element={<Room />}></Route>
        )}
        <Route path="/story" element={<ViewStory />}></Route>
        <Route path="/grooming" element={<Grooming />}></Route>
        <Route path="/configuration" element={<Configuration />}></Route>
        <Route path="/room" element={<Room />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
