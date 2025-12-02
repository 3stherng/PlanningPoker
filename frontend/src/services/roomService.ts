import { Get, Post } from "../communication";
import { Room, RoomId } from "../types/storyManagement";

/**
 * Service layer for room-related API calls.
 *
 * Responsibilities:
 * - Wraps communication.ts HTTP utilities for room operations
 * - Maps backend DTOs to domain models
 * - Provides typed interface for UI layer
 * - Handles error cases consistently
 *
 * This follows the Single Responsibility Principle by focusing
 * only on room data operations, and Dependency Inversion Principle
 * by providing an abstraction over HTTP communication.
 */

// Adapter: map backend DTOs to UI models
const toRoom = (dto: any): Room => ({
  id: dto.id,
  name: dto.name,
});

export const roomService = {
  /**
   * Fetches the list of all available rooms.
   * @returns Promise resolving to array of Room objects
   * @throws Error if request fails
   */
  async listRooms(): Promise<Room[]> {
    const { status, result } = await Get("/room/list");
    if (!status) throw new Error(result?.error ?? "Failed to load rooms");
    return (result ?? []).map(toRoom);
  },

  /**
   * Creates a new room with the specified name.
   * @param name - The name for the new room
   * @returns Promise resolving to the updated list of rooms
   * @throws Error if request fails
   */
  async createRoom(name: string): Promise<Room[]> {
    const { status, result } = await Post("/room/create", { name });
    if (!status) throw new Error(result?.error ?? "Failed to create room");
    console.log("Created room:", result);
    if (Array.isArray(result)) {
      return result;
    } else {
      // Backend returned a single room, fetch the full list
      return await this.listRooms();
    }
  },

  /**
   * Validates that a room exists before joining.
   * @param roomId - The ID of the room to validate
   * @returns Promise resolving to true if room exists
   * @throws Error if room doesn't exist or request fails
   */
  async validateRoom(roomId: RoomId): Promise<boolean> {
    // This could be extended with a dedicated endpoint
    // For now, we check if the room exists in the list
    const rooms = await this.listRooms();
    const exists = rooms.some((room) => room.id === roomId);
    if (!exists) {
      throw new Error("Room not found");
    }
    return true;
  },
};
