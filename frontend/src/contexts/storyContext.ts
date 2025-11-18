import React, { ReactNode, useState } from "react";

export interface StoryContextType {
  allStories: any[];
  groomingStoryID: any;
  updateGroomingStoryID: (story: any) => void;
  addStory: (story: any) => void;
  deleteStory: () => void;
  setUpdateStoryCallback: (callback: any) => void;
}

export const StoryContext = React.createContext<StoryContextType>({
  allStories: [],
  groomingStoryID: "",
  updateGroomingStoryID: () => {},
  addStory: () => {},
  deleteStory: () => {},
  setUpdateStoryCallback: () => {},
});

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<any[]>([]);
  const [grooming_story, setGroomingStory] = useState("");

  const updateGroomingStoryID = (story: any) => {
    setGroomingStory(story);
  };

  const addStory = (story: any) => {
    setStories([...stories, story]);
  };

  const deleteStory = () => {
    // No-op or implement as needed
  };

  const setUpdateStoryCallback = (callback: any) => {
    // No-op: callback system removed to prevent infinite loops
  };

  const value: StoryContextType = {
    allStories: stories,
    groomingStoryID: grooming_story,
    updateGroomingStoryID,
    addStory,
    deleteStory,
    setUpdateStoryCallback,
  };

  return React.createElement(
    StoryContext.Provider,
    { value },
    children
  );
};
