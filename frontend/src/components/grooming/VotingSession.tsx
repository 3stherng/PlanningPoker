import { Card, Row, Col } from "react-bootstrap";
import { VotingGrid } from "./VotingGrid";
import { PlayersList } from "./PlayersList";
import { ActionButtons } from "./ActionButtons";
import { GroomingHeader } from "./GroomingHeader";

interface VotingSessionProps {
  storyName: string;
  selectedStoryId: number | null;
  allStories: any[];
  votingOptions: (number | string)[];
  currentUserId: number | null;
  allUsers: any[];
  allVotes: any[];
  feedback: { type: "success" | "error"; message: string } | null;
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  onVote: (storyId: number | null, userId: number | null, size: number | null) => void;
  onSubmit: (storyId: number | null) => void;
  onRevote: (storyId: number | null) => void;
  roomId: number | undefined;
}

export function VotingSession({
  storyName,
  selectedStoryId,
  allStories,
  votingOptions,
  currentUserId,
  allUsers,
  allVotes,
  feedback,
  onStorySelect,
  onVote,
  onSubmit,
  onRevote,
  roomId,
}: VotingSessionProps) {
  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={10}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <GroomingHeader
            storyName={storyName}
            selectedStoryId={selectedStoryId}
            allStories={allStories}
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
                <PlayersList allVotes={allVotes} allUsers={allUsers} />
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
