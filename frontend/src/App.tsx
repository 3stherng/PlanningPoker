import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import { StoryContext } from "./contexts/storyContext";
import { UserContext } from "./contexts/userContext";

import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";

import { Homepage } from "./pages/Homepage";
import { ViewStory } from "./pages/StoryManagement";
import { Grooming } from "./pages/Grooming";
import { Configuration } from "./pages/Configuration";

function App() {
  const [, callback] = useState({});
  const updateCallback = () => {
    callback({});
  };
  const { setUpdateUserCallback } = useContext(UserContext);
  setUpdateUserCallback(updateCallback);

  const { setUpdateStoryCallback } = useContext(StoryContext);
  setUpdateStoryCallback(updateCallback);

  const { getCurrUserName } = useContext(UserContext);
  const curr_user_name = getCurrUserName();

  return (
    <div className="App">
      <NavigationBar user={curr_user_name}></NavigationBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/story" element={<ViewStory />}></Route>
          <Route path="/grooming" element={<Grooming />}></Route>
          <Route path="/configuration" element={<Configuration />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
