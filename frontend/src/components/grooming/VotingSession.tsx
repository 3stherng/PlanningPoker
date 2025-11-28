import { Card, Row, Col } from "react-bootstrap";
import { VotingGrid } from "./VotingGrid";
import { PlayersList } from "./PlayersList";
import { ActionButtons } from "./ActionButtons";
import { GroomingHeader } from "./GroomingHeader";
import { Player, Story, Vote, Feedback } from "../../types/grooming";

interface VotingSessionProps {
  storyName: string;
  selectedStoryId: number | null;
  stories: Story[];
  votingOptions: (number | string)[];
  currentUserId: number | null;
  players: Player[];
  votes: Vote[];
  moderatorId: number | null;
  votesRevealed: boolean;
  onRevealVotes: () => void;
  feedback: Feedback | null;
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  onVote: (storyId: number | null, userId: number | null, size: number | null) => void;
  onSubmit: (storyId: number | null) => void;
  onRevote: (storyId: number | null) => void;
  roomId: number | undefined;
}

export function VotingSession({
  storyName,
  selectedStoryId,
  stories,
  votingOptions,
  currentUserId,
  players,
  votes,
  feedback,
  onStorySelect,
  onVote,
  onSubmit,
  onRevote,
  roomId,
  moderatorId,
  votesRevealed,
  onRevealVotes,
}: VotingSessionProps) {
  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={10}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <GroomingHeader
            storyName={storyName}
            selectedStoryId={selectedStoryId}
            stories={stories}
            feedback={feedback}
            onStorySelect={onStorySelect}
            roomId={roomId}
          />

          <Card.Body>
            <Row className="mb-4">
              <Col md={8}>
                <VotingGrid
                  votingOptions={votingOptions}
                  selectedStoryId={selectedStoryId}
                  currentUserId={currentUserId}
                  onVote={onVote}
                />
              </Col>

              <Col md={4}>
                <PlayersList
                  votes={votes}
                  players={players}
                  currentUserId={currentUserId}
                  moderatorId={moderatorId}
                  votesRevealed={votesRevealed}
                  onReveal={onRevealVotes}
                />
              </Col>
            </Row>

            <ActionButtons
              selectedStoryId={selectedStoryId}
              onSubmit={onSubmit}
              onRevote={onRevote}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
