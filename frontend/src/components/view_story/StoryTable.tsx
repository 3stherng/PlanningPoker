import { Table, Button } from "react-bootstrap";

export function StoryTable({
  stories,
  type,
  onEdit,
  onDelete,
  onSize,
}: {
  stories: any[];
  type: "all" | "active" | "completed";
  onEdit: (id: any) => void;
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
          {type !== "completed" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {stories.map((story, idx) => {
          if (type === "all") {
            return (
              <tr key={idx}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{story.size ?? "Active"}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onEdit(story.id)}
                  >
                    Edit
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
                    Let’s Size
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
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </Table>
  );
}
