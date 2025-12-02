import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Accordion, Alert } from "react-bootstrap";
import { Post } from "../communication";
import { Feedback } from "../types/grooming";

export function Configuration({ room_id }: { room_id: any }) {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [moderator, setModerator] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const fetchAllUsers = async (room_id: any) => {
    const { status, result } = await Post("/user/active_users", {
      room_id,
    });
    if (status) setAllUsers(result);
    else setFeedback({ type: "error", message: "⚠️ Failed to fetch users." });
  };

  useEffect(() => {
    fetchAllUsers(room_id);
  }, [room_id]);

  const requestUpdateModerator = async (id: string) => {
    const { status } = await Post("/user/moderator", {
      id,
    });
    if (status) {
      setFeedback({
        type: "success",
        message: "👑 Moderator updated successfully!",
      });
    } else
      setFeedback({ type: "error", message: "⚠️ Failed to update moderator." });
  };

  const requestDeleteUser = async (id: string) => {
    const { status } = await Post("/user/delete", { id });
    if (status) {
      setFeedback({ type: "success", message: "🗑️ User deleted." });
      setAllUsers(allUsers.filter((u) => u.id !== id));
    } else setFeedback({ type: "error", message: "⚠️ Failed to delete user." });
  };

  function updateModerator(user_id: string) {
    setModerator(user_id);
    requestUpdateModerator(user_id);
  }

  function deleteUser(user_id: string) {
    requestDeleteUser(user_id);
  }

  const renderUsers = () => (
    <Row className="g-4 justify-content-center">
      {allUsers.map((user) => (
        <Col xs={12} md={6} lg={4} key={user.id}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="text-center">
              <Card.Title className="fw-bold">{user.name}</Card.Title>
              {user.id === moderator ? (
                <p className="text-primary fw-semibold">👑 Moderator</p>
              ) : (
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => updateModerator(user.id)}
                  >
                    Make Moderator
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={8}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Manage Players</Accordion.Header>
              <Accordion.Body>
                {feedback && (
                  <Alert
                    variant={feedback.type === "success" ? "success" : "danger"}
                    className="text-center"
                  >
                    {feedback.message}
                  </Alert>
                )}
                {renderUsers()}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Change Card Type</Accordion.Header>
              <Accordion.Body>
                <p className="text-muted">Feature coming soon…</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Col>
    </Row>
  );
}
