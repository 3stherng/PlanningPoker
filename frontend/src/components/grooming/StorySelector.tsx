import { Form } from "react-bootstrap";
import { Story } from "../../types/grooming";

interface StorySelectorProps {
  selectedStoryId: string | null;
  stories: Story[];
  onStorySelect: (storyId: string, roomId: string | undefined) => void;
  roomId: string | undefined;
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
        const selectedId = String(e.target.value);
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
