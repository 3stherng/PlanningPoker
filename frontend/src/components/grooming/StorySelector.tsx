import { Form } from "react-bootstrap";

interface StorySelectorProps {
  selectedStoryId: number | null;
  allStories: any[];
  onStorySelect: (storyId: number, roomId: number | undefined) => void;
  roomId: number | undefined;
}

export function StorySelector({
  selectedStoryId,
  allStories,
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
      {allStories.map((s) => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
    </Form.Select>
  );
}
