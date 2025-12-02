export let users = [
  { id: "a1f3e2", name: "me", is_moderator: false },
  { id: "b2e4d3", name: "User B", is_moderator: true },
  { id: "c3d5f4", name: "User C", is_moderator: false },
  { id: "d4c6a5", name: "User D", is_moderator: false },
  { id: "e5b7c6", name: "User E", is_moderator: false },
  { id: "f6a8d7", name: "User F", is_moderator: false },
  { id: "a7f9e8", name: "User G", is_moderator: false },
  { id: "b8eaf9", name: "User H", is_moderator: false },
];

export let active_users = [
  { room_id: "r1a2b3", user_id: "a1f3e2", size: 0 },
  { room_id: "r1a2b3", user_id: "b2e4d3", size: 0 },
  { room_id: "r1a2b3", user_id: "c3d5f4", size: 0 },
  { room_id: "r2c3d4", user_id: "d4c6a5", size: 0 },
  { room_id: "r2c3d4", user_id: "e5b7c6", size: 0 },
  { room_id: "r2c3d4", user_id: "f6a8d7", size: 0 },
  { room_id: "r3e4f5", user_id: "a7f9e8", size: 0 },
  { room_id: "r3e4f5", user_id: "b8eaf9", size: 0 },
];

export let rooms = [
  { id: "r1a2b3", name: "Room 1", story_id: null },
  { id: "r2c3d4", name: "Room 2", story_id: "s5a6b7" },
  { id: "r3e4f5", name: "Room 3", story_id: null },
];

export let stories = [
  { id: "s5a6b7", title: "This is story A", size: 4 },
  { id: "s6c7d8", title: "This is story B", size: 5 },
  { id: "s7e8f9", title: "This is story C", size: null },
  { id: "s8f9a0", title: "This is story D", size: null },
  { id: "s9a0b1", title: "This is story E", size: 4 },
];

export let votes = [
  { story_id: "s5a6b7", user_id: "b2e4d3", size: 3 },
  { story_id: "s5a6b7", user_id: "c3d5f4", size: 5 },
  { story_id: "s5a6b7", user_id: "d4c6a5", size: 2 },
  { story_id: "s5a6b7", user_id: "e5b7c6", size: 3 },
  { story_id: "s5a6b7", user_id: "f6a8d7", size: 4 },
  { story_id: "s5a6b7", user_id: "a7f9e8", size: 4 },
  { story_id: "s5a6b7", user_id: "b8eaf9", size: 2 },
  { story_id: "s6c7d8", user_id: "b2e4d3", size: 3 },
  { story_id: "s6c7d8", user_id: "c3d5f4", size: 5 },
  { story_id: "s6c7d8", user_id: "d4c6a5", size: 2 },
  { story_id: "s7e8f9", user_id: "e5b7c6", size: 3 },
  { story_id: "s7e8f9", user_id: "f6a8d7", size: 4 },
  { story_id: "s7e8f9", user_id: "a7f9e8", size: 4 },
  { story_id: "s7e8f9", user_id: "b8eaf9", size: 2 },
  { story_id: "s8f9a0", user_id: "b2e4d3", size: 3 },
  { story_id: "s8f9a0", user_id: "c3d5f4", size: 5 },
  { story_id: "s8f9a0", user_id: "d4c6a5", size: 2 },
  { story_id: "s8f9a0", user_id: "e5b7c6", size: 3 },
  { story_id: "s8f9a0", user_id: "f6a8d7", size: 4 },
  { story_id: "s8f9a0", user_id: "a7f9e8", size: 4 },
  { story_id: "s8f9a0", user_id: "b8eaf9", size: 2 },
  { story_id: "s9a0b1", user_id: "b2e4d3", size: 3 },
  { story_id: "s9a0b1", user_id: "c3d5f4", size: 5 },
  { story_id: "s9a0b1", user_id: "d4c6a5", size: 2 },
  { story_id: "s9a0b1", user_id: "e5b7c6", size: 3 },
  { story_id: "s9a0b1", user_id: "f6a8d7", size: 4 },
  { story_id: "s9a0b1", user_id: "a7f9e8", size: 4 },
  { story_id: "s9a0b1", user_id: "b8eaf9", size: 2 },
];

export let timers: { story_id: string; timer: number | null }[] = [
  { story_id: "s5a6b7", timer: null },
  { story_id: "s6c7d8", timer: null },
];
