import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import { Post } from "../communication";

export function Homepage() 
{
  const [currUser, setCurrUser] = useState("");
  const { updateCurrUserName } = useContext(UserContext);

  const registerUser = async (name: any) => 
    {
    const { status } = await Post("http://localhost:3000/user/register", {
      name: name,
    });
    if (status === true) 
      {
      alert("Registered");
    } else console.log("Something is wrong!");
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getCurrUser(val: React.ChangeEvent<HTMLInputElement>) 
  {
    setCurrUser(val.target.value);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleClick(user_name: any) 
  {
    registerUser(user_name);
    updateCurrUserName(user_name);
  }

  return (
    <Row>
      <Col xs={{ span: 6, offset: 3 }}>
        <Card className="align-content-center p-5 card">
          <div className="form-container m-2">
            <Col xs={{ span: 12, offset: 0 }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  textAlign: "center",
                }}>
                Welcome to PlanITPoker
              </p>
            </Col>
            <Col xs={{ span: 12, offset: 0 }}>
              <Form>
                <Form.Group className="mb-3" controlId="formUser">
                  <Form.Text className="text-muted">Let Start!</Form.Text>
                  <Form.Control
                    placeholder="Enter your name"
                    onChange={getCurrUser}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    handleClick(currUser);
                  }}>
                  Join the room
                </Button>
              </Form>
            </Col>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
