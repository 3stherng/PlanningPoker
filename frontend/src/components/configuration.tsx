import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Get, Post } from "../communication";
import Accordion from "react-bootstrap/Accordion";

export function Configuration() {
  const [allUsers, setAllUsers] = useState([]);
  const [moderator, setModerator] = useState(1);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const { status, result } = await Get("http://localhost:3000/user/list");
    if (status === true) {
      setAllUsers(result);
    }
  };

  const requestUpdateModerator = async (id: any) => {
    const { status } = await Post("http://localhost:3000/user/moderator", {
      id: id,
    });
    if (status === true) {
      alert("moderator updated");
    } else console.log("something is wrong!");
  };

  const requestDeleteUser = async (id: any) => {
    const { status } = await Post("http://localhost:3000/user/delete", {
      id: id,
    });
    if (status === true) {
      alert("user deleted");
    } else console.log("something is wrong!");
  };

  function updateModerator(user_id: any) {
    setModerator(user_id);
    requestUpdateModerator(user_id);
  }

  function deleteUser(user_id: any) {
    console.log("called");
    const updated_users = allUsers.filter((user: any) => {
      return user.id !== user_id;
    });
    setAllUsers(updated_users);
    requestDeleteUser(updated_users);
  }

  const showModerator = allUsers.map((user: any, idx: any) => {
    if (user.id === moderator) {
      return (
        <tr key={idx}>
          <td className="w-auto p-3">
            <Card style={{ width: "18rem" }}>
              <Card.Header>Moderator</Card.Header>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
              </Card.Body>
            </Card>
          </td>
        </tr>
      );
    } else return null;
  });

  const showNonModerators = allUsers.map((user: any, idx: any) => {
    if (user.id !== moderator) {
      return (
        <tr key={idx}>
          <td className="w-auto p-3">
            <Card key={idx} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => {
                    updateModerator(user.id);
                  }}
                >
                  Make moderator
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Remove
                </Button>{" "}
                {/* <Button variant="primary" >Edit</Button> */}
              </Card.Body>
            </Card>
          </td>
        </tr>
      );
    } else return null;
  });

  const allPlayers = (
    <Row>
      <Col xs={{ span: 12, offset: 0 }}>
        <div className="form-container m-2">
          <Col xs={{ span: 12, offset: 0 }}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              Users
            </p>
          </Col>
          <Col xs={{ span: 6, offset: 3 }}>{showModerator}</Col>
          <Col xs={{ span: 6, offset: 3 }}>{showNonModerators}</Col>
        </div>
      </Col>
    </Row>
  );

  return (
    <Row>
      <Col xs={{ span: 6, offset: 3 }}>
        <Card className="align-content-center p-5 card">
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Manage Players</Accordion.Header>
              <Accordion.Body>{allPlayers}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Change card type</Accordion.Header>
              <Accordion.Body>ToDO</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </Col>
    </Row>
  );
}
