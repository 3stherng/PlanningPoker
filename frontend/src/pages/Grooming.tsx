import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
  ListGroup,
  Badge,
  Alert,
} from "react-bootstrap";
import { StoryContext } from "../contexts/storyContext";
import { UserContext } from "../contexts/userContext";
import { Get, Post } from "../communication";

export function Grooming() {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [allStories, setAllStories] = useState<any[]>([]);
  const [allVotes, setAllVotes] = useState<any[]>([]);
  const [averageSize, setAverageSize] = useState("");
  const [showAddStory, setShowAddStory] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [title, setTitle] = useState("");
  const [storyName, setStoryName] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { currUserName } = useContext(UserContext);
  const curr_user_name = currUserName;

  const { groomingStoryID } = useContext(StoryContext);
  const story_id = groomingStoryID;

  let curr_user_id: any = null;

  allStories.forEach((story: any) => {
    if (story.id === story_id) setStoryName(story.title);
  });

  allUsers.forEach((user: any) => {
    if (user.name === curr_user_name) curr_user_id = user.id;
  });

  useEffect(() => {
    fetchAllUsers();
    fetchStories();
    fetchAllVotes(story_id);
  }, [story_id]);

  const fetchAllUsers = async () => {
    const { status, result } = await Get("/user/list");
    if (status) setAllUsers(result);
  };

  const fetchStories = async () => {
    const { status, result } = await Get("/story/list");
    if (status) setAllStories(result);
  };

  const fetchAllVotes = async (story_id: any) => {
    const { status, result } = await Post("/size/allvotes", { story_id });
    if (status) setAllVotes(result);
  };

  const requestCurrUserVote = async (
    story_id: any,
    user_id: any,
    size: any,
  ) => {
    const { status } = await Post("/size/voting", {
      story_id,
      user_id,
      size,
    });
    if (status) {
      setFeedback({ type: "success", message: "✅ Vote submitted!" });
      fetchAllVotes(story_id);
    } else setFeedback({ type: "error", message: "⚠️ Failed to vote." });
  };

  const requestRevote = async (story_id: any) => {
    const { status, result } = await Post("/size/revote", {
      story_id,
    });
    if (status) {
      setFeedback({
        type: "success",
        message: "🔄 Votes cleared. Please revote.",
      });
      setAllStories(result);
      setAllVotes([]);
    }
  };

  const requestSubmitVote = async (story_id: any) => {
    const { status, result } = await Post("/size/submit", {
      story_id,
    });
    if (status) {
      setAverageSize(result);
      setShowResult(true);
    }
  };

  const requestAddStory = async (title: string) => {
    const { status, result } = await Post("/story/add", {
      title,
    });
    if (status) {
      setFeedback({ type: "success", message: "📖 Story added!" });
      setAllStories(result);
      setStoryName(title);
    }
  };

  const votingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 13, 21, "?"];

  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={10}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <Card.Header className="bg-white border-0 text-center">
            <h2 className="fw-bold text-primary">🃏 Grooming Session</h2>
            <p className="text-muted">
              {storyName ? `Story: ${storyName}` : "No story selected"}
              {!storyName && (
                <Button variant="link" onClick={() => setShowAddStory(true)}>
                  Add Story
                </Button>
              )}
            </p>
          </Card.Header>

          {feedback && (
            <Alert
              variant={feedback.type === "success" ? "success" : "danger"}
              className="text-center"
            >
              {feedback.message}
            </Alert>
          )}

          <Card.Body>
            <Row className="mb-4">
              <Col md={8}>
                <h5 className="fw-semibold mb-3">Vote your estimate</h5>
                <Container>
                  <Row xs={3} md={4} className="g-3">
                    {votingOptions.map((size, idx) => (
                      <Col key={idx}>
                        <Button
                          variant="outline-primary"
                          className="w-100 rounded-pill"
                          size="lg"
                          onClick={() =>
                            requestCurrUserVote(
                              story_id,
                              curr_user_id,
                              size === "?" ? null : size,
                            )
                          }
                        >
                          {size}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Col>

              <Col md={4}>
                <h5 className="fw-semibold mb-3">Players</h5>
                <ListGroup>
                  {allVotes.map((vote, idx) => (
                    <ListGroup.Item
                      key={idx}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span className="fw-bold">{vote.user}</span>
                      <Badge bg="primary" pill>
                        {vote.size ?? "?"}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                variant="primary"
                onClick={() => requestSubmitVote(story_id)}
              >
                Submit Size
              </Button>
              <Button
                variant="secondary"
                onClick={() => requestRevote(story_id)}
              >
                Revote
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Add Story Modal */}
      <Modal show={showAddStory} onHide={() => setShowAddStory(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              requestAddStory(title);
              setShowAddStory(false);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter story title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowAddStory(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Confirm
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Result Modal */}
      <Modal show={showResult} onHide={() => setShowResult(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Story Size Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="fw-bold">Average Size: {averageSize}</h4>
        </Modal.Body>
      </Modal>
    </Row>
  );
}
