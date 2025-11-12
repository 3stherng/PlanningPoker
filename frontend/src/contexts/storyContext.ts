import React from "react";

let stories: any = [];
let grooming_story: any = "";
let updateCallback = (param: any) => {};

export const StoryContext = React.createContext({
  getAllStories: () => {
    return stories;
  },

  getGroomingStoryID: () => {
    return grooming_story;
  },

  updateGroomingStoryID: (story: any) => {
    grooming_story = story;
    updateCallback({});
  },

  addStory: (story: any) => {
    stories.push(story);
    updateCallback({});
  },
  deleteStory: () => {
    // todo: delete story
    updateCallback({});
  },

  setUpdateStoryCallback: (callback: any) => {
    updateCallback = callback;
  },
});
