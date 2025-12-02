import { useParams } from "react-router-dom";
import { VotingSession } from "../components/grooming/VotingSession";
import { PlayersManagement } from "../components/grooming/PlayersManagement";
import { ResultModal } from "../components/grooming/ResultModal";
import { useGrooming } from "../hooks/useGrooming";

export function Grooming() {
  const { room_id } = useParams();
  const roomId = room_id ? String(room_id) : undefined;
  const {
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
    updateModerator,
    removeUser,
  } = useGrooming(roomId);

  // ============ Constants ============
  const votingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 13, 21, "?"];

  // ============ Render ============
  return (
    <>
      <VotingSession
        storyName={storyName}
        selectedStoryId={selectedStoryId}
        stories={stories}
        votingOptions={votingOptions}
        currentUserId={currentUserId}
        players={players}
        votes={votes}
        feedback={votingFeedback}
        onDismissFeedback={() => setVotingFeedback(null)}
        onStorySelect={(sid) => selectStory(sid)}
        onVote={(_, __, size) => castVote(size)}
        onSubmit={() => submitSize()}
        onRevote={() => revote()}
        roomId={roomId}
        moderatorId={moderatorId}
        votesRevealed={votesRevealed}
        onRevealVotes={revealVotes}
      />

      <PlayersManagement
        players={players}
        moderatorId={moderatorId}
        feedback={playerFeedback}
        onDismissFeedback={() => setPlayerFeedback(null)}
        onUpdateModerator={updateModerator}
        onDeleteUser={removeUser}
      />

      <ResultModal
        show={showResult}
        averageSize={averageSize}
        onHide={() => setShowResult(false)}
      />
    </>
  );
}
