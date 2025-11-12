import "./App.css";
import { useContext, useState} from 'react';
import { Routes, Router, Route, BrowserRouter } from 'react-router-dom';

import { StoryContext } from "./contexts/storyContext";
import { UserContext } from "./contexts/userContext";
import { Header } from "./components/header";
import { Homepage } from "./components/homepage";
import { ViewStory } from "./components/viewStory";
import { Grooming } from "./components/groomStory";
import { Configuration } from "./components/configuration";
import { Footer } from "./components/footer";

function App() {
  
  const [, callback] = useState({});
  const updateCallback = () => {
    callback({});
  };
  const {setUpdateUserCallback} = useContext(UserContext);
  setUpdateUserCallback(updateCallback);

  const {setUpdateStoryCallback} = useContext(StoryContext);
  setUpdateStoryCallback(updateCallback);

  const { getCurrUserName } = useContext(UserContext)
  const curr_user_name = getCurrUserName();

  return (
    <div className="App">
      <Header user={curr_user_name}></Header>
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
