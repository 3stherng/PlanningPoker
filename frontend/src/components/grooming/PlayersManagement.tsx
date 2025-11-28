import { Row, Col, Card, Alert, Accordion, Button } from "react-bootstrap";

interface PlayersManagementProps {
  activeUsers: any[];
  moderator: number | null;
  feedback: { type: "success" | "error"; message: string } | null;
  onUpdateModerator: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

export function PlayersManagement({
  activeUsers,
  moderator,
  feedback,
  onUpdateModerator,
  onDeleteUser,
}: PlayersManagementProps) {
  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={8}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Manage players</Accordion.Header>
              <Accordion.Body>
                {feedback && (
                  <Alert
                    variant={feedback.type === "success" ? "success" : "danger"}
                    className="text-center"
                  >
                    {feedback.message}
                  </Alert>
                )}
                <Row className="g-4 justify-content-center">
                  {activeUsers.map((user) => (
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
                                onClick={() => onUpdateModerator(user.id)}
                              >
                                Make Moderator
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDeleteUser(user.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                  {activeUsers.length === 0 && (
                    <Col xs={12}>
                      <p className="text-muted text-center">No active users yet.</p>
                    </Col>
                  )}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Change card type</Accordion.Header>
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
