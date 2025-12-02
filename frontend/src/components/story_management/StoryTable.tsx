import { Table, Button } from "react-bootstrap";
import { Story, StoryId, StoryViewType } from "../../types/storyManagement";

interface StoryTableProps {
  stories: Story[];
  viewType: StoryViewType;
  onDelete: (storyId: StoryId) => void;
  onGroom: (storyId: StoryId) => void;
}

export function StoryTable({
  stories,
  viewType,
  onDelete,
  onGroom,
}: StoryTableProps) {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Story Title</th>
          {viewType !== "active" && <th>Size</th>}
          {<th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {stories.map((story, idx) => {
          if (viewType === "all") {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>
                  {story.size ?? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onGroom(story.id)}
                    >
                      Groom
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(story.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
          if (viewType === "active" && story.size == null) {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onGroom(story.id)}
                  >
                    Groom
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(story.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
          if (viewType === "completed" && story.size != null) {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{story.size}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(story.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </Table>
  );
}
