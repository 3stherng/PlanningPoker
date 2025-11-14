import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { StoryContext } from "../contexts/storyContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Dropdown, ListGroup } from "react-bootstrap";

import { Get, Post } from "../communication";

export function ViewStory() {
  const [allStories, setAllStories] = useState([]);
  const [title, setTitle] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  const [show, setShow] = useState(false);
  const [showM1, setShowM1] = useState(false);

  const { updateGroomingStoryID } = useContext(StoryContext);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseM1 = () => {
    console.log("hide");
    setShowM1(false);
  };
  const handleShowM1 = () => {
    console.log("show");
    setShowM1(true);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    console.log("fetchStories");
    const { status, result } = await Get("http://localhost:3000/story/list");
    if (status === true) setAllStories(result);
  };

  const requestdeleteStory = async (story_id: any) => {
    const { status } = await Post("http://localhost:3000/story/delete", {
      story_id: story_id,
    });
    if (status === true) {
      alert("Story Deleted");
    } else console.log("something is wrong!");
  };

  const requestUpdateTitle = async (story_id: any, edited_title: any) => {
    const { status, result } = await Post(
      "http://localhost:3000/story/update",
      {
        id: story_id,
        title: edited_title,
      }
    );
    if (status === true) {
      alert("Title updated");
      console.log(`update api called, result is ${result}`);
      setEditedTitle(result);
    } else console.log("something is wrong!");
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleChange(event: any) {
    setTitle(event.target.value);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function handleChangeTitle(event: any)
  // {
  //   setEditedTitle(event.target.value)
  //   console.log(event)
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleSubmit(event: any) {
    requestAddStory(title);
    setShow(false);
    event.preventDefault();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function submitEditedTitle(story_id: any) {
    console.log(`called ${story_id}`);
    requestUpdateTitle(story_id, editedTitle);
    setShowM1(false);
    // event.preventDefault()
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleClick(story_id: any) {
    navigate("/grooming");
    updateGroomingStoryID(story_id);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function deleteStory(id: any) {
    console.log("calledDeleteStory");
    const updated_stories = allStories.filter((story: any) => {
      return story.id !== id;
    });
    setAllStories(updated_stories);
    requestdeleteStory(updated_stories);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getUpdatedTitle = (story_id: any) => {
    console.log(story_id);
    return (
      <>
        <Button variant="info" onClick={handleShowM1}>
          Edit Story
        </Button>
        <Modal show={showM1} onHide={handleCloseM1}>
          <Modal.Header closeButton>
            <Modal.Title>New Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUser">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter title"
                  onChange={(e: any) => setEditedTitle(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" onClick={handleCloseM1}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => submitEditedTitle(story_id)}
              >
                Confirm
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const get_all_stories = allStories.map((story: any, idx: any) => {
    if (story.size == null)
      return (
        <tr key={idx}>
          <td className="w-auto p-3">{story.id}</td>
          <td className="w-auto p-3">{story.title}</td>
          <td className="w-auto p-3">Active</td>
          <td className="w-auto p-3">
            <>{getUpdatedTitle(story.id)}</>
          </td>
        </tr>
      );
    else
      return (
        <tr key={idx}>
          <td className="w-auto p-3">{story.id}</td>
          <td className="w-auto p-3">{story.title}</td>
          <td className="w-auto p-3">{story.size}</td>
          <td className="w-auto p-3">
            <>{getUpdatedTitle(story.id)}</>
          </td>
        </tr>
      );
  });

  const size = ["XS", "S", "M", "L", "XL"];

  const filter = (
    <Dropdown>
      <Dropdown.Toggle variant="warning">Filter</Dropdown.Toggle>
      <Dropdown.Menu>
        <Container>
          <Row style={{ minWidth: "50vw" }}>
            <Col>
              <ListGroup>
                {size.map((option: any, id: any) => (
                  <Row key={id}>
                    <Col xs="2">
                      <input type="checkbox" />
                    </Col>
                    <Col>
                      <p>{option}</p>
                    </Col>
                  </Row>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );

  const all_stories = (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Story Title</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>{get_all_stories}</tbody>
    </Table>
  );

  const get_active_story = allStories.map((story: any, idx: any) => {
    if (story.size == null) {
      return (
        <tr key={idx}>
          <td className="w-auto p-3">{story.id}</td>
          <td className="w-auto p-3">{story.title}</td>
          <td className="w-auto p-3">
            <Button variant="primary" onClick={() => handleClick(story.id)}>
              Let's Size
            </Button>{" "}
            <Button variant="danger" onClick={() => deleteStory(story.id)}>
              Delete Story
            </Button>
          </td>
        </tr>
      );
    } else return null;
  });

  const active_stories = (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Story Title</th>
        </tr>
      </thead>
      <tbody>{get_active_story}</tbody>
    </Table>
  );

  const get_completed_story = allStories.map((story: any, idx: any) => {
    if (story.size != null) {
      return (
        <tr key={idx}>
          <td className="w-auto p-3">{story.id}</td>
          <td className="w-auto p-3">{story.title}</td>
          <td className="w-auto p-3">{story.size}</td>
        </tr>
      );
    } else return null;
  });

  const completed_stories = (
    <Table responsive="lg" striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Story Title</th>
          <th>Size {filter}</th>
        </tr>
      </thead>
      <tbody>{get_completed_story}</tbody>
    </Table>
  );

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

  const add_story = (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Story
      </Button>

      <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <Row>
      <Col xs={{ span: 8, offset: 2 }}>
        <Card className="align-content-center p-5 card">
          <Tabs
            defaultActiveKey="all"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="all" title="All Stories">
              {all_stories}
            </Tab>
            <Tab eventKey="active" title="Active Story">
              {active_stories}
            </Tab>
            <Tab eventKey="completed" title="Completed Story">
              {completed_stories}
            </Tab>
          </Tabs>
          <Card.Body>{add_story}</Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
