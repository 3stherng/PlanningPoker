// Domain types for the Grooming feature. Keep UI decoupled from backend shapes.

/**
 * Type-safe user identifier.
 */
export type UserId = string;

/**
 * Type-safe story identifier.
 */
export type StoryId = string;

/**
 * Represents a user participating in the grooming session.
 */
export interface Player {
  id: UserId;
  name: string;
  isModerator?: boolean;
}

/**
 * Represents a user story being estimated.
 */
export interface Story {
  id: StoryId;
  title: string;
  averageSize?: string;
}

/**
 * Represents a vote cast by a player for a story.
 */
export interface Vote {
  userId: UserId;
  size: number | null; // null represents "?" (unknown)
}

/**
 * Feedback message types.
 */
export type FeedbackType = "success" | "error";

/**
 * User feedback message with type and content.
 */
export interface Feedback {
  type: FeedbackType;
  message: string;
}
