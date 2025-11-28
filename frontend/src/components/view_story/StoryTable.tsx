import { Table, Button } from "react-bootstrap";

export function StoryTable({
  stories,
  type,
  onDelete,
  onSize,
}: {
  stories: any[];
  type: "all" | "active" | "completed";
  onDelete: (id: any) => void;
  onSize: (id: any) => void;
}) {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Story Title</th>
          {type !== "active" && <th>Size</th>}
          {<th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {stories.map((story, idx) => {
          if (type === "all") {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>
                  {story.size ?? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onSize(story.id)}
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
          if (type === "active" && story.size == null) {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onSize(story.id)}
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
          if (type === "completed" && story.size != null) {
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
