import { useContext, useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";   // ✅ import navigate
import { UserContext } from "../contexts/userContext";
import { Post } from "../communication";

export function Homepage() {
  const [currUser, setCurrUser] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { updateCurrUserName } = useContext(UserContext);
  const navigate = useNavigate();   // ✅ hook

  // ✅ Load cached user on first render
  useEffect(() => {
    const cachedUser = localStorage.getItem("currUser");
    if (cachedUser) {
      setCurrUser(cachedUser);
      updateCurrUserName(cachedUser);
      navigate("/story");   // ✅ redirect to your desired page
    }
  }, [updateCurrUserName, navigate]);

  const registerUser = async (name: string) => {
    const res = await Post("/user/register", { name });
    const status = res.status;

    if (status) {
      setFeedback({
        type: "success",
        message: "🎉 Successfully registered! Welcome aboard.",
      });
      updateCurrUserName(name);
      localStorage.setItem("currUser", name);
      navigate("/stories");   // ✅ redirect after successful registration
    } else if (res.result.error === "Conflict") {
      setFeedback({
        type: "error",
        message: "⚠️ Username already taken. Please choose another.",
      });
    } else {
      setFeedback({
        type: "error",
        message: "⚠️ Something went wrong. Please try again.",
      });
    }
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currUser.trim()) {
      setFeedback({ type: "error", message: "Please enter a valid name." });
      return;
    }
    registerUser(currUser);
  };

  return (
    <Row className="justify-content-center align-items-center vh-100 bg-light">
      <Col xs={12} md={8} lg={6}>
        <Card className="shadow-lg border-0 rounded-4 p-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">Planning Poker</h1>
            <p className="text-muted">
              Collaborate, estimate, and plan smarter 🚀
            </p>
          </div>

          {feedback && (
            <Alert
              variant={feedback.type === "success" ? "success" : "danger"}
              className="text-center"
            >
              {feedback.message}
            </Alert>
          )}

          <Form onSubmit={handleClick}>
            <Form.Group className="mb-4" controlId="formUser">
              <Form.Label className="fw-semibold">Enter your name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Esther"
                value={currUser}
                onChange={(e) => setCurrUser(e.target.value)}
                className="rounded-pill"
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="rounded-pill"
              >
                Join
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
