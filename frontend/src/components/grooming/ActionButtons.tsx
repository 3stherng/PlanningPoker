import { Button } from "react-bootstrap";

interface ActionButtonsProps {
  selectedStoryId: string | null;
  onSubmit: (storyId: string | null) => void;
  onRevote: (storyId: string | null) => void;
}

export function ActionButtons({
  selectedStoryId,
  onSubmit,
  onRevote,
}: ActionButtonsProps) {
  return (
    <div className="d-flex justify-content-center gap-3 mt-4">
      <Button
        variant="primary"
        onClick={() => onSubmit(selectedStoryId)}
        disabled={!selectedStoryId}
      >
        Submit Size
      </Button>
      <Button
        variant="secondary"
        onClick={() => onRevote(selectedStoryId)}
        disabled={!selectedStoryId}
      >
        Revote
      </Button>
    </div>
  );
}
