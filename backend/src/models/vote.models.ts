export interface Vote {
  story_id: string;
  user_id: string;
  size: number;
}

export interface Timer {
  story_id: string;
  timer: number | null;
}
