/**
 * Domain types for Story Management feature.
 * Represents stories that need to be estimated in planning poker.
 */

export type StoryId = string;
export type RoomId = string;

/**
 * Represents a user story with optional size estimation.
 */
export interface Story {
  id: StoryId;
  title: string;
  size?: string | null;
}

/**
 * Represents a room where grooming sessions take place.
 */
export interface Room {
  id: RoomId;
  name: string;
}

/**
 * Story view filter types.
 */
export type StoryViewType = "all" | "active" | "completed";
