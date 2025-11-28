import { useParams } from "react-router-dom";
import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { StoryContext } from "../contexts/storyContext";
import { UserContext } from "../contexts/userContext";
import { Get, Post } from "../communication";
import { VotingSession } from "../components/grooming/VotingSession";
import { PlayersManagement } from "../components/grooming/PlayersManagement";
import { ResultModal } from "../components/grooming/ResultModal";

export function Grooming() {
  const { room_id } = useParams();
  const roomId = room_id ? Number(room_id) : undefined;

  // ============ State ============
  // Voting session state
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allStories, setAllStories] = useState<any[]>([]);
  const [allVotes, setAllVotes] = useState<any[]>([]);
  const [averageSize, setAverageSize] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Players management state
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [moderator, setModerator] = useState<number | null>(null);
  const [feedback1, setFeedback1] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ============ Context ============
  const { currUserName } = useContext(UserContext);
  const { groomingStoryID, setGroomingStoryID } = useContext(StoryContext);
  const selectedStoryId = groomingStoryID;

  // ============ Derived Values ============
  const storyName = useMemo(() => {
    const found = allStories.find((s: any) => s.id === selectedStoryId);
    return found?.title ?? "";
  }, [allStories, selectedStoryId]);

  const curr_user_id = useMemo(() => {
    const found = allUsers.find((u: any) => u.name === currUserName);
    return found?.id ?? null;
  }, [allUsers, currUserName]);

  // ============ Constants ============
  const votingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 13, 21, "?"];

  // ============ API Calls ============
  const fetchActiveUsers = useCallback(async (room_id: any) => {
    const { status, result } = await Post("/user/active_users", { room_id });
    if (status) {
      setActiveUsers(result);
      const foundMod = result.find((u: any) => u.isModerator);
      if (foundMod) setModerator(foundMod.id);
    } else {
      setFeedback1({ type: "error", message: "⚠️ Failed to fetch users." });
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    const { status, result } = await Get("/user/list");
    if (status) setAllUsers(result);
    else setFeedback({ type: "error", message: "⚠️ Failed to load users." });
  }, []);

  const fetchStories = useCallback(async () => {
    const { status, result } = await Get("/story/list");
    if (status) setAllStories(result);
    else setFeedback({ type: "error", message: "⚠️ Failed to load stories." });
  }, []);

  const fetchAllVotes = async (sid: any) => {
    const { status, result } = await Post("/size/allvotes", { story_id: sid });
    if (status) setAllVotes(result);
    else setFeedback({ type: "error", message: "⚠️ Failed to load votes." });
  };

  const fetchActiveStory = useCallback(async (room_id: any) => {
    const { status, result } = await Get(`/room/${room_id}/active_story`);
    if (status && result.story_id) {
      setGroomingStoryID(result.story_id);
    }
  }, [setGroomingStoryID]);

  // ============ Vote Handlers ============
  const requestCurrUserVote = async (sid: any, uid: any, size: any) => {
    if (!sid || !uid) {
      setFeedback({
        type: "error",
        message:
          "⚠️ Missing story or user. Please select a story and ensure you're listed.",
      });
      return;
    }
    const { status } = await Post("/size/voting", {
      story_id: sid,
      user_id: uid,
      size,
    });
    if (status) {
      setFeedback({ type: "success", message: "✅ Vote submitted!" });
      fetchAllVotes(sid);
    } else {
      setFeedback({ type: "error", message: "⚠️ Failed to vote." });
    }
  };

  const requestRevote = async (sid: any) => {
    if (!sid) return;
    const { status, result } = await Post("/size/revote", { story_id: sid });
    if (status) {
      setFeedback({
        type: "success",
        message: "🔄 Votes cleared. Please revote.",
      });
      setAllStories(result);
      setAllVotes([]);
    } else {
      setFeedback({ type: "error", message: "⚠️ Failed to clear votes." });
    }
  };

  const requestSubmitVote = async (sid: any) => {
    if (!sid) return;
    const { status, result } = await Post("/size/submit", { story_id: sid });
    if (status) {
      setAverageSize(result);
      setShowResult(true);
      setAllStories((prev) =>
        prev.map((s) => (s.id === sid ? { ...s, averageSize: result } : s))
      );
    } else {
      setFeedback({ type: "error", message: "⚠️ Failed to submit size." });
    }
  };

  // ============ Players Management Handlers ============
  const requestUpdateModerator = async (id: number) => {
    const { status } = await Post("/user/moderator", { id });
    if (status) {
      setModerator(id);
      setFeedback1({
        type: "success",
        message: "👑 Moderator updated successfully!",
      });
    } else {
      setFeedback1({
        type: "error",
        message: "⚠️ Failed to update moderator.",
      });
    }
  };

  const requestDeleteUser = async (id: number) => {
    const { status } = await Post("/user/delete", { id });
    if (status) {
      setFeedback({ type: "success", message: "🗑️ User deleted." });
      setAllUsers((prev) => prev.filter((u) => u.id !== id));
      setModerator((prev) => (prev === id ? null : prev));
    } else {
      setFeedback({ type: "error", message: "⚠️ Failed to delete user." });
    }
  };

  // ============ Effects ============
  useEffect(() => {
    if (roomId) fetchActiveUsers(roomId);
  }, [fetchActiveUsers, roomId]);

  useEffect(() => {
    fetchAllUsers();
    fetchStories();
    fetchActiveStory(roomId);
  }, [fetchAllUsers, fetchStories, fetchActiveStory, roomId]);

  useEffect(() => {
    if (selectedStoryId) fetchAllVotes(selectedStoryId);
  }, [selectedStoryId]);

  const handleStorySelect = async (storyId: number, roomId: number | undefined) => {
    setGroomingStoryID(storyId); // update local context
    console.log("Setting active story for room:", roomId, "to story:", storyId);
    await Post("/room/set_story", { room_id: roomId, story_id: storyId }); // persist to backend
  };

  // ============ Render ============
  return (
    <>
      <VotingSession
        storyName={storyName}
        selectedStoryId={selectedStoryId}
        allStories={allStories}
        votingOptions={votingOptions}
        currentUserId={curr_user_id}
        allUsers={allUsers}
        allVotes={allVotes}
        feedback={feedback}
        onStorySelect={handleStorySelect}
        onVote={requestCurrUserVote}
        onSubmit={requestSubmitVote}
        onRevote={requestRevote}
        roomId={roomId}
      />

      <PlayersManagement
        activeUsers={activeUsers}
        moderator={moderator}
        feedback={feedback1}
        onUpdateModerator={requestUpdateModerator}
        onDeleteUser={requestDeleteUser}
      />

      <ResultModal
        show={showResult}
        averageSize={averageSize}
        onHide={() => setShowResult(false)}
      />
    </>
  );
}
