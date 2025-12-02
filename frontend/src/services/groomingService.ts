import { Get, Post } from "../communication";
import { Player, Story, StoryId, Vote } from "../types/grooming";

/**
 * Service layer for grooming-related API calls.
 *
 * Responsibilities:
 * - Wraps communication.ts HTTP utilities
 * - Maps backend DTOs (snake_case) to domain models (camelCase)
 * - Provides typed interface for UI layer
 * - Handles error cases consistently
 *
 * This follows the Dependency Inversion Principle by providing
 * an abstraction over the raw HTTP communication layer.
 */

// Adapter: map backend DTOs (snake_case) to UI models (camelCase)
const toPlayer = (dto: any): Player => ({
  id: dto.id,
  name: dto.name,
  isModerator: Boolean(dto.isModerator ?? dto.is_moderator ?? dto.moderator),
});

const toStory = (dto: any): Story => ({
  id: dto.id,
  title: dto.title,
  averageSize: dto.averageSize ?? dto.average_size,
});

const toVote = (dto: any): Vote => ({
  userId: dto.user_id ?? dto.userId,
  size: dto.size ?? null,
});

export const groomingService = {
  async listAllUsers(): Promise<Player[]> {
    const { status, result } = await Get("/user/list");
    if (!status) throw new Error(result?.error ?? "Failed to load users");
    return (result ?? []).map(toPlayer);
  },

  async getActiveUsers(roomId: string): Promise<Player[]> {
    const { status, result } = await Post("/user/active_users", {
      room_id: roomId,
    });
    if (!status)
      throw new Error(result?.error ?? "Failed to load active users");
    return (result ?? []).map(toPlayer);
  },

  async addActiveUser(roomId: string, userId: string): Promise<void> {
    const { status, result } = await Post("/user/add_active_user", {
      room_id: roomId,
      user_id: userId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to add active user");
  },

  // Remove a user from the active users list
  async removeActiveUser(userId: string): Promise<void> {
    const { status, result } = await Post("/user/remove_active_user", {
      user_id: userId,
    });
    if (!status)
      throw new Error(result?.error ?? "Failed to remove active user");
  },

  async listStories(): Promise<Story[]> {
    const { status, result } = await Get("/story/list");
    if (!status) throw new Error(result?.error ?? "Failed to load stories");
    return (result ?? []).map(toStory);
  },

  async getActiveStory(roomId: string): Promise<StoryId | null> {
    const { status, result } = await Get(`/room/${roomId}/active_story`);
    if (!status) return null;
    return result?.story_id ?? result?.storyId ?? null;
  },

  async setActiveStory(roomId: string, storyId: string): Promise<void> {
    const { status, result } = await Post("/room/set_story", {
      room_id: roomId,
      story_id: storyId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to set active story");
  },

  async castVote(
    roomId: string,
    userId: string,
    size: number | null
  ): Promise<void> {
    const { status, result } = await Post("/user/vote", {
      room_id: roomId,
      user_id: userId,
      size,
    });
    if (!status) throw new Error(result?.error ?? "Failed to vote");
  },

  async getVotesForRoom(roomId: string): Promise<Vote[]> {
    const { status, result } = await Post("/user/get_votes", {
      room_id: roomId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to get votes");
    return (result ?? []).map(toVote);
  },

  async getAllVotesForStory(storyId: string): Promise<Vote[]> {
    const { status, result } = await Post("/size/allvotes", {
      story_id: storyId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to load votes");
    return (result ?? []).map(toVote);
  },

  async revote(storyId: string): Promise<Story[]> {
    const { status, result } = await Post("/size/revote", {
      story_id: storyId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to revote");
    return (result ?? []).map(toStory);
  },

  async submitSize(storyId: string): Promise<string> {
    const { status, result } = await Post("/size/submit", {
      story_id: storyId,
    });
    if (!status) throw new Error(result?.error ?? "Failed to submit size");
    return String(result);
  },

  async setModerator(userId: string): Promise<void> {
    const { status, result } = await Post("/user/moderator", { id: userId });
    if (!status) throw new Error(result?.error ?? "Failed to set moderator");
  },

  async deleteUser(userId: string): Promise<void> {
    const { status, result } = await Post("/user/delete", { id: userId });
    if (!status) throw new Error(result?.error ?? "Failed to delete user");
  },
};
