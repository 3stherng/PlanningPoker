import { Get, Post, Delete } from "../communication";
import { Story, Room, StoryId } from "../types/storyManagement";

const toStory = (dto: any): Story => ({
  id: dto.id,
  title: dto.title,
  size: dto.size ?? dto.averageSize ?? null,
});

const toRoom = (dto: any): Room => ({
  id: dto.id,
  name: dto.name,
});

export const storyManagementService = {
  async listStories(): Promise<Story[]> {
    const { status, result } = await Get("/story/list");
    if (!status) throw new Error(result?.error ?? "Failed to load stories");
    return (result ?? []).map(toStory);
  },

  async addStory(title: string): Promise<Story[]> {
    const { status, result } = await Post("/story/add", { title });
    if (!status) throw new Error(result?.error ?? "Failed to add story");
    return (result ?? []).map(toStory);
  },

  async deleteStory(storyId: StoryId): Promise<void> {
    const { status, result } = await Delete("/story/delete/" + storyId);
    if (!status) throw new Error(result?.error ?? "Failed to delete story");
  },

  async listRooms(): Promise<Room[]> {
    const { status, result } = await Get("/room/list");
    if (!status) throw new Error(result?.error ?? "Failed to load rooms");
    return (result ?? []).map(toRoom);
  },
};
