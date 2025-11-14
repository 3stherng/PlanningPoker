import { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Card } from "react-bootstrap";
import { StoryContext } from "../contexts/storyContext";
import { Get, Post } from "../communication";
import { UserContext } from "../contexts/userContext";

export function Grooming() {
  const [allUsers, setAllUsers] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [allVotes, setAllVotes] = useState([]);
  const [averageSize, setAverageSize] = useState("");
  const [showM1, setShowM1] = useState(false);
  const [showM2, setShowM2] = useState(false);
  const [title, setTitle] = useState("");
  const [storyName, setStoryName] = useState("");

  const { getCurrUserName } = useContext(UserContext);
  const curr_user_name = getCurrUserName();

  const { getGroomingStoryID } = useContext(StoryContext);
  const story_id = getGroomingStoryID();

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
    const { status, result } = await Get("http://localhost:3000/user/list");
    if (status === true) setAllUsers(result);
  };

  const fetchStories = async () => {
    const { status, result } = await Get("http://localhost:3000/story/list");
    if (status === true) setAllStories(result);
  };

  const fetchAllVotes = async (story_id: any) => {
    const { status, result } = await Post(
      "http://localhost:3000/size/allvotes",
      {
        story_id: story_id,
      }
    );
    if (status === true) setAllVotes(result);
  };

  const requestCurrUserVote = async (
    story_id: any,
    user_id: any,
    size: any
  ) => {
    const { status, result } = await Post("http://localhost:3000/size/voting", {
      story_id: story_id,
      user_id: user_id,
      size: size,
    });
    if (status === true) {
      alert("You have voted");
      console.log(result);
    } else console.log("something is wrong!");
  };

  const requestRevote = async (story_id: any) => {
    const { status, result } = await Post("http://localhost:3000/size/revote", {
      story_id: story_id,
    });
    if (status === true) {
      alert("Cleared Votes");
      setAllStories(result);
    } else console.log("something is wrong!");
  };

  const requestSubmitVote = async (story_id: any) => {
    const { status, result } = await Post("http://localhost:3000/size/submit", {
      story_id: story_id,
    });
    if (status === true) {
      setAverageSize(result);
    } else console.log("something is wrong!");
  };

  const requestAddStory = async (title: any) => {
    const { status, result } = await Post("http://localhost:3000/story/add", {
      title: title,
    });
    console.log(status, result);
    if (status === true) {
      alert("story added");
      setAllStories(result);
    } else console.log("something is wrong!");
  };

  function handleChange(event: any) {
    setTitle(event.target.value);
  }

  function handleSubmitVote(story_id: any) {
    if (storyName !== "") {
      requestSubmitVote(story_id);
      setShowM2(true);
      setTitle("");
    } else alert("Please add story");
  }

  function handleVote(story_id: any, user_id: any, size: any) {
    if (storyName !== "") {
      requestCurrUserVote(story_id, user_id, size);
    } else {
      alert("Please add story");
    }
  }

  function handleSubmitTitle(event: any) {
    requestAddStory(title);
    setShowM1(false);
    setStoryName(title);
    event.preventDefault();
  }

  const handleCloseM1 = () => setShowM1(false);
  const handleShowM1 = () => setShowM1(true);

  const handleCloseM2 = () => setShowM2(false);

  const getGroomingStory = (story_name: any) => {
    if (story_name === "")
      return (
        <>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Groom Story:
            {"  "}
            <Button variant="link" onClick={handleShowM1}>
              Add Story
            </Button>
          </p>
          <Modal show={showM1} onHide={handleCloseM1}>
            <Modal.Header closeButton>
              <Modal.Title>Add Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formUser">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Enter title"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={handleCloseM1}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitTitle}
                >
                  Confirm
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      );
    else return <> Groom Story: {story_name} </>;
  };

  const grooming_story = <>{getGroomingStory(storyName)}</>;

  const all_votes = allVotes.map((vote: any, idx: any) => {
    console.log(allVotes);
    return (
      <ListGroup as="ol" key={idx}>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <Stack direction="horizontal" gap={5}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{vote.user}</div>
            </div>
            <Badge bg="primary" pill>
              {vote.size}
            </Badge>
          </Stack>
        </ListGroup.Item>
      </ListGroup>
    );
  });

  const cards = (
    <div className="row">
      <div className="col-3">
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 1)}
        >
          1{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 5)}
        >
          5{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 13)}
        >
          13{" "}
        </Button>
      </div>

      <div className="col-3">
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 2)}
        >
          2{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 6)}
        >
          6{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 21)}
        >
          21{" "}
        </Button>
      </div>

      <div className="col-3">
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 3)}
        >
          3{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 7)}
        >
          7{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, null)}
        >
          ?{" "}
        </Button>
      </div>

      <div className="col-3">
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 4)}
        >
          4{" "}
        </Button>
        <br />
        <br />
        <Button
          variant="light"
          size="lg"
          onClick={() => handleVote(story_id, curr_user_id, 8)}
        >
          8{" "}
        </Button>
      </div>
    </div>
  );

  const showAverageSize = (
    <>
      {() => setShowM2(false)}
      <Button variant="primary" onClick={() => handleSubmitVote(story_id)}>
        Submit Size
      </Button>{" "}
      <Modal show={showM2} onHide={handleCloseM2}>
        <Modal.Header closeButton>
          <Modal.Title>Story Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUser">
              <Form.Label>Average Size is:</Form.Label>{" "}
              <Form.Label>{averageSize}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <Row>
      <Col xs={{ span: 8, offset: 2 }}>
        <Card className="align-content-center p-5 card">
          {grooming_story}
          <Card.Body>
            <Stack direction="horizontal" gap={3}>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={{ span: 4, offset: 2 }}>{cards}</Col>
                  <Col xs={{ span: 4, offset: 2 }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Players
                    </p>
                    {all_votes}
                  </Col>
                </Row>
              </Container>
            </Stack>
            <br />
            <br />
            {showAverageSize}
            <Button variant="secondary" onClick={() => requestRevote(story_id)}>
              Revote
            </Button>{" "}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
