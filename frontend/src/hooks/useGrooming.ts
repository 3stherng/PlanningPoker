import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { StoryContext } from "../contexts/storyContext";
import { groomingService } from "../services/groomingService";
import { Feedback, Player, Story, Vote } from "../types/grooming";

/**
 * State and actions returned by the useGrooming hook.
 * Encapsulates all business logic for the Grooming page.
 */
export interface UseGroomingState {
  // Data
  players: Player[];
  stories: Story[];
  votes: Vote[];
  selectedStoryId: string | null;
  moderatorId: string | null;
  currentUserId: string | null;
  votesRevealed: boolean;
  averageSize: string;
  showResult: boolean;
  // Derived
  storyName: string;
  // Feedback
  votingFeedback: Feedback | null;
  playerFeedback: Feedback | null;
  // Actions
  selectStory: (storyId: string) => Promise<void>;
  castVote: (size: number | null) => Promise<void>;
  revealVotes: () => Promise<void>;
  submitSize: () => Promise<void>;
  revote: () => Promise<void>;
  setShowResult: (v: boolean) => void;
  setVotingFeedback: (f: Feedback | null) => void;
  setPlayerFeedback: (f: Feedback | null) => void;
  setVotesRevealed: (v: boolean) => void;
  updateModerator: (userId: string) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
}

/**
 * Custom hook for grooming session state management.
 *
 * Handles:
 * - Loading players, stories, and votes
 * - Synchronizing room state with backend
 * - Vote casting and revealing
 * - Story selection and sizing
 * - Player management (moderator, removal)
 *
 * @param roomId - The ID of the room for this grooming session
 * @returns State and action handlers for the grooming UI
 *
 * @example
 * ```tsx
 * function Grooming() {
 *   const roomId = 123;
 *   const { players, castVote, revealVotes } = useGrooming(roomId);
 *   return <VotingSession players={players} onVote={castVote} />;
 * }
 * ```
 */
export function useGrooming(roomId: string | undefined): UseGroomingState {
  const { currUserName } = useContext(UserContext);
  const { groomingStoryID, setGroomingStoryID } = useContext(StoryContext);

  const [players, setPlayers] = useState<Player[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);

  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [moderatorId, setModeratorId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [votesRevealed, setVotesRevealed] = useState<boolean>(false);

  const [averageSize, setAverageSize] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const [votingFeedback, setVotingFeedback] = useState<Feedback | null>(null);
  const [playerFeedback, setPlayerFeedback] = useState<Feedback | null>(null);

  // Derived
  const storyName = useMemo(() => {
    const found = stories.find((s) => s.id === selectedStoryId);
    return found?.title ?? "";
  }, [stories, selectedStoryId]);

  // Load baseline data
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const [allUsers, allStories] = await Promise.all([
          groomingService.listAllUsers(),
          groomingService.listStories(),
        ]);
        if (!isMounted) return;
        setStories(allStories);

        // Resolve current user id
        const me = allUsers.find((u) => u.name === currUserName) ?? null;
        setCurrentUserId(me?.id ?? null);

        // Add me as active user when possible
        if (roomId && me?.id) {
          try {
            await groomingService.addActiveUser(roomId, me.id);
          } catch {
            // non-fatal; ignore
          }
          const activePlayers = await groomingService.getActiveUsers(roomId);
          if (!isMounted) return;
          setPlayers(activePlayers);
          const mod = activePlayers.find((p) => p.isModerator);
          setModeratorId(mod?.id ?? null);
        }

        // Sync selected story from room's active story if available
        if (roomId) {
          const activeStoryId = await groomingService.getActiveStory(roomId);
          if (!isMounted) return;
          const storyId = activeStoryId ?? (groomingStoryID || null);
          setSelectedStoryId(storyId);
          if (storyId) setGroomingStoryID(storyId);
          if (storyId) {
            try {
              const storyVotes =
                await groomingService.getAllVotesForStory(storyId);
              if (isMounted) setVotes(storyVotes);
            } catch {
              // ignore
            }
          }
        }
      } catch (e: any) {
        setVotingFeedback({
          type: "error",
          message: e.message ?? "Failed to initialize grooming",
        });
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, [roomId, currUserName, groomingStoryID, setGroomingStoryID]);

  // Actions
  const selectStory = useCallback(
    async (storyId: string) => {
      setSelectedStoryId(storyId);
      setGroomingStoryID(storyId);
      setVotesRevealed(false);
      if (roomId) await groomingService.setActiveStory(roomId, storyId);
    },
    [roomId, setGroomingStoryID]
  );

  const castVote = useCallback(
    async (size: number | null) => {
      if (!roomId || !currentUserId || !selectedStoryId) {
        setVotingFeedback({
          type: "error",
          message: "Missing room, user, or story to vote.",
        });
        return;
      }
      try {
        await groomingService.castVote(roomId, currentUserId, size);
        setVotingFeedback({ type: "success", message: "Vote submitted." });
        const refreshed =
          await groomingService.getAllVotesForStory(selectedStoryId);
        setVotes(refreshed);
      } catch (e: any) {
        setVotingFeedback({
          type: "error",
          message: e.message ?? "Failed to vote.",
        });
      }
    },
    [roomId, currentUserId, selectedStoryId]
  );

  const revealVotes = useCallback(async () => {
    if (!roomId) return;
    try {
      const result = await groomingService.getVotesForRoom(roomId);
      setVotes(result);
      setVotesRevealed(true);
      setVotingFeedback({ type: "success", message: "Votes revealed." });
    } catch (e: any) {
      setVotingFeedback({
        type: "error",
        message: e.message ?? "Failed to reveal votes.",
      });
    }
  }, [roomId]);

  const submitSize = useCallback(async () => {
    if (!selectedStoryId) return;
    try {
      const avg = await groomingService.submitSize(selectedStoryId);
      setAverageSize(avg);
      setShowResult(true);
      setStories((prev) =>
        prev.map((s) =>
          s.id === selectedStoryId ? { ...s, averageSize: avg } : s
        )
      );
    } catch (e: any) {
      setVotingFeedback({
        type: "error",
        message: e.message ?? "Failed to submit size.",
      });
    }
  }, [selectedStoryId]);

  const revote = useCallback(async () => {
    if (!selectedStoryId) return;
    try {
      const updatedStories = await groomingService.revote(selectedStoryId);
      setStories(updatedStories);

      // Clear votes and reset state
      setVotes([]);
      setVotesRevealed(false);

      // Fetch fresh votes from backend to confirm they're cleared
      const freshVotes =
        await groomingService.getAllVotesForStory(selectedStoryId);
      setVotes(freshVotes);

      setVotingFeedback({
        type: "success",
        message: "Votes cleared. Please revote.",
      });
    } catch (e: any) {
      setVotingFeedback({
        type: "error",
        message: e.message ?? "Failed to clear votes.",
      });
    }
  }, [selectedStoryId]);

  const updateModerator = useCallback(async (userId: string) => {
    try {
      await groomingService.setModerator(userId);
      setModeratorId(userId);
      setPlayerFeedback({
        type: "success",
        message: "Moderator updated successfully.",
      });
    } catch (e: any) {
      setPlayerFeedback({
        type: "error",
        message: e.message ?? "Failed to update moderator.",
      });
    }
  }, []);

  const removeUser = useCallback(async (userId: string) => {
    try {
      await groomingService.deleteUser(userId);
      setPlayers((prev) => prev.filter((p) => p.id !== userId));
      setPlayerFeedback({ type: "success", message: "User deleted." });
      setModeratorId((prev) => (prev === userId ? null : prev));
    } catch (e: any) {
      setPlayerFeedback({
        type: "error",
        message: e.message ?? "Failed to delete user.",
      });
    }
  }, []);

  return {
    players,
    stories,
    votes,
    selectedStoryId,
    moderatorId,
    currentUserId,
    votesRevealed,
    averageSize,
    showResult,
    storyName,
    votingFeedback,
    playerFeedback,
    selectStory,
    castVote,
    revealVotes,
    submitSize,
    revote,
    setShowResult,
    setVotingFeedback,
    setPlayerFeedback,
    setVotesRevealed,
    updateModerator,
    removeUser,
  };
}
