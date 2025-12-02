import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomService } from "../services/roomService";
import { Room, RoomId } from "../types/storyManagement";
import { Feedback } from "../types/grooming";

/**
 * State and actions returned by the useRoom hook.
 * Encapsulates all business logic for the Room page.
 */
export interface UseRoomState {
  // Data
  rooms: Room[];
  isLoading: boolean;

  // Modal state
  showCreateModal: boolean;
  showJoinModal: boolean;

  // Feedback
  feedback: Feedback | null;

  // Actions
  loadRooms: () => Promise<void>;
  createRoom: (name: string) => Promise<void>;
  joinRoom: (roomId: RoomId) => void;
  enterRoom: (roomId: RoomId) => void;
  setShowCreateModal: (show: boolean) => void;
  setShowJoinModal: (show: boolean) => void;
  setFeedback: (feedback: Feedback | null) => void;
}

/**
 * Custom hook for room management.
 *
 * Handles:
 * - Loading list of available rooms
 * - Creating new rooms
 * - Joining and navigating to rooms
 * - Modal state management
 * - User feedback/notifications
 *
 * This follows the Single Responsibility Principle by separating
 * business logic from UI presentation, and allows for easier testing.
 *
 * @returns State and action handlers for the Room UI
 *
 * @example
 * ```tsx
 * function Room() {
 *   const { rooms, createRoom, enterRoom } = useRoom();
 *   return <RoomList rooms={rooms} onEnter={enterRoom} />;
 * }
 * ```
 */
export function useRoom(): UseRoomState {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const navigate = useNavigate();

  /**
   * Loads the list of available rooms from the backend.
   */
  const loadRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const roomList = await roomService.listRooms();
      // Defensive: ensure it's an array before setting state
      setRooms(Array.isArray(roomList) ? roomList : []);
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "Failed to load rooms",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Creates a new room with the specified name.
   * On success, updates the room list and closes the modal.
   *
   * @param name - The name for the new room
   */
  const createRoom = useCallback(async (name: string) => {
    if (!name.trim()) {
      setFeedback({
        type: "error",
        message: "Room name cannot be empty",
      });
      return;
    }

    try {
      const updatedRooms = await roomService.createRoom(name);
      // Defensive: ensure it's an array before setting state
      setRooms(Array.isArray(updatedRooms) ? updatedRooms : []);
      setShowCreateModal(false);
      setFeedback({
        type: "success",
        message: "✅ Room created successfully!",
      });
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "⚠️ Failed to create room.",
      });
    }
  }, []);

  /**
   * Joins a room by ID. Validates the room exists before navigating.
   *
   * @param roomId - The ID of the room to join
   */
  const joinRoom = useCallback(
    async (roomId: RoomId) => {
      if (!roomId) {
        setFeedback({
          type: "error",
          message: "Please enter a valid room ID",
        });
        return;
      }

      try {
        // Validate room exists (optional, could skip for better UX)
        await roomService.validateRoom(roomId);
        setShowJoinModal(false);
        navigate(`/grooming/${roomId}`);
      } catch (error: any) {
        setFeedback({
          type: "error",
          message: error.message ?? "Failed to join room",
        });
      }
    },
    [navigate],
  );

  /**
   * Directly enters a room without validation.
   * Used when clicking on existing rooms from the list.
   *
   * @param roomId - The ID of the room to enter
   */
  const enterRoom = useCallback(
    (roomId: RoomId) => {
      navigate(`/grooming/${roomId}`);
    },
    [navigate],
  );

  // Load rooms on mount
  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return {
    rooms,
    isLoading,
    showCreateModal,
    showJoinModal,
    feedback,
    loadRooms,
    createRoom,
    joinRoom,
    enterRoom,
    setShowCreateModal,
    setShowJoinModal,
    setFeedback,
  };
}
