import { Card } from "react-bootstrap";
import { StorySelector } from "./StorySelector";
import { Feedback, Story } from "../../types/grooming";
import { FeedbackAlert } from "../shared/FeedbackAlert";

interface GroomingHeaderProps {
  storyName: string;
  selectedStoryId: number | null;
  stories: Story[];
  feedback: Feedback | null;
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  roomId: number | undefined;
}

export function GroomingHeader({
  storyName,
  selectedStoryId,
  stories,
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
          stories={stories}
          onStorySelect={onStorySelect}
          roomId={roomId}
        />
      </Card.Header>

      <FeedbackAlert feedback={feedback} />
    </>
  );
}
