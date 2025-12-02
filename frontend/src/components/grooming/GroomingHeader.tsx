import { Card } from "react-bootstrap";
import { StorySelector } from "./StorySelector";
import { Feedback, Story } from "../../types/grooming";
import { FeedbackAlert } from "../shared/FeedbackAlert";

interface GroomingHeaderProps {
  storyName: string;
  selectedStoryId: string | null;
  stories: Story[];
  feedback: Feedback | null;
  onDismissFeedback?: () => void;
  onStorySelect: (storyId: string, roomId: string | undefined) => void;
  roomId: string | undefined;
}

export function GroomingHeader({
  storyName,
  selectedStoryId,
  stories,
  feedback,
  onDismissFeedback,
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

      <FeedbackAlert feedback={feedback} onDismiss={onDismissFeedback} />
    </>
  );
}
