import { Button } from "react-bootstrap";

interface ActionButtonsProps {
  selectedStoryId: number | null;
  onSubmit: (storyId: number | null) => void;
  onRevote: (storyId: number | null) => void;
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
