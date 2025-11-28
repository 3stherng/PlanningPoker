import { Form } from "react-bootstrap";
import { Story } from "../../types/grooming";

interface StorySelectorProps {
  selectedStoryId: number | null;
  stories: Story[];
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  roomId: number | undefined;
}

export function StorySelector({
  selectedStoryId,
  stories,
  onStorySelect,
  roomId,
}: StorySelectorProps) {
  return (
    <Form.Select
      value={selectedStoryId ?? ""}
      onChange={(e) => {
        const selectedId = Number(e.target.value);
        onStorySelect(selectedId, roomId);
      }}
      className="mt-2"
    >
      <option value="">Select a story...</option>
      {stories.map((s) => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
    </Form.Select>
  );
}
