export interface User {
  id: string;
  name: string;
  is_moderator: boolean;
}

export interface ActiveUser {
  room_id: string;
  user_id: string;
  size: number;
}
