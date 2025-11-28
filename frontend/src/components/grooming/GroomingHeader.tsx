import { Card, Alert } from "react-bootstrap";
import { StorySelector } from "./StorySelector";

interface GroomingHeaderProps {
  storyName: string;
  selectedStoryId: number | null;
  allStories: any[];
  feedback: { type: "success" | "error"; message: string } | null;
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  roomId: number | undefined;
}

export function GroomingHeader({
  storyName,
  selectedStoryId,
  allStories,
  feedback,
  onStorySelect,
  roomId,
}: GroomingHeaderProps) {
  return (
    <>
      <Card.Header className="bg-white border-0 text-center">
        <h2 className="fw-bold text-primary">🃏 Grooming session</h2>
        <StorySelector
          selectedStoryId={selectedStoryId}
          allStories={allStories}
          onStorySelect={onStorySelect}
          roomId={roomId}
        />
      </Card.Header>

      {feedback && (
        <Alert
          variant={feedback.type === "success" ? "success" : "danger"}
          className="text-center"
        >
          {feedback.message}
        </Alert>
      )}
    </>
  );
}
