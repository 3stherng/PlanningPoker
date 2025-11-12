export let users = [
  { id: 1, name: "me", is_moderator: false },
  { id: 2, name: "User B", is_moderator: true },
  { id: 3, name: "User C", is_moderator: false },
  { id: 4, name: "User D", is_moderator: false },
  { id: 5, name: "User E", is_moderator: false },
  { id: 6, name: "User F", is_moderator: false },
  { id: 7, name: "User G", is_moderator: false },
  { id: 8, name: "User H", is_moderator: false },
];

export let stories = [
  { id: 1, title: "This is story A", size: 4 },
  { id: 2, title: "This is story B", size: 5 },
  { id: 3, title: "This is story C", size: null },
  { id: 4, title: "This is story D", size: null },
  { id: 5, title: "This is story E", size: 4 },
];

export let votes = [
  { story_id: 1, user_id: 2, size: 3 },
  { story_id: 1, user_id: 3, size: 5 },
  { story_id: 1, user_id: 4, size: 2 },
  { story_id: 1, user_id: 5, size: 3 },
  { story_id: 1, user_id: 6, size: 4 },
  { story_id: 1, user_id: 7, size: 4 },
  { story_id: 1, user_id: 8, size: 2 },
  { story_id: 2, user_id: 2, size: 3 },
  { story_id: 2, user_id: 3, size: 5 },
  { story_id: 2, user_id: 4, size: 2 },
  { story_id: 3, user_id: 5, size: 3 },
  { story_id: 3, user_id: 6, size: 4 },
  { story_id: 3, user_id: 7, size: 4 },
  { story_id: 3, user_id: 8, size: 2 },
  { story_id: 4, user_id: 2, size: 3 },
  { story_id: 4, user_id: 3, size: 5 },
  { story_id: 4, user_id: 4, size: 2 },
  { story_id: 4, user_id: 5, size: 3 },
  { story_id: 4, user_id: 6, size: 4 },
  { story_id: 4, user_id: 7, size: 4 },
  { story_id: 4, user_id: 8, size: 2 },
  { story_id: 5, user_id: 2, size: 3 },
  { story_id: 5, user_id: 3, size: 5 },
  { story_id: 5, user_id: 4, size: 2 },
  { story_id: 5, user_id: 5, size: 3 },
  { story_id: 5, user_id: 6, size: 4 },
  { story_id: 5, user_id: 7, size: 4 },
  { story_id: 5, user_id: 8, size: 2 },
];

export let timers = [
  { story_id: 1, timer: null },
  { story_id: 2, timer: null },
];
