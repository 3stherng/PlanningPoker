import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Toast,
} from "react-bootstrap";
import { Get, Post } from "../communication";

export function Room() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { status, result } = await Get("/room/list");
    if (status) setRooms(result);
  };

  const requestCreateRoom = async () => {
    const { status, result } = await Post("/room/create", {
      name: newRoomName,
    });
    if (status) {
      setToast({ type: "success", message: "✅ Room created successfully!" });
      setRooms(result);
      setNewRoomName("");
      setShowCreateModal(false);
    } else {
      setToast({ type: "error", message: "⚠️ Failed to create room." });
    }
  };

  const requestJoinRoom = async () => {
    const { status } = await Post("/room/join", { id: joinRoomId });
    if (status) {
      setToast({ type: "success", message: "🚪 Joined room successfully!" });
      setShowJoinModal(false);
      navigate(`/room/${joinRoomId}`);
    } else {
      setToast({ type: "error", message: "⚠️ Failed to join room." });
    }
  };

  return (
    <Container className="py-5">
      {/* Page Title */}
      <h1 className="text-center fw-bold mb-4 text-primary">
        Collaboration Rooms
      </h1>
      <p className="text-center text-muted mb-5">
        Create a new room or join an existing one to start collaborating.
      </p>

      {/* Room Grid */}
      <Row>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Col md={4} key={room.id} className="mb-4">
              <Card className="shadow-sm border-0 rounded-3 hover-zoom">
                <Card.Body>
                  <Card.Title className="fw-bold">{room.name}</Card.Title>
                  <Card.Text className="text-muted">ID: {room.id}</Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    🚪 Enter Room
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted text-center">
              No rooms available yet. Create one below!
            </p>
          </Col>
        )}
      </Row>

      {/* Floating Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button
          className="rounded-pill px-4"
          variant="success"
          onClick={() => setShowCreateModal(true)}
        >
          ➕ Create Room
        </Button>

        <Button
          className="rounded-pill px-4"
          variant="primary"
          onClick={() => setShowJoinModal(true)}
        >
          🔑 Join Room by ID
        </Button>
      </div>

      {/* Create Room Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <Form.Text className="text-muted">
              Choose a unique name for your room.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={requestCreateRoom}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Join Room Modal */}
      <Modal
        show={showJoinModal}
        onHide={() => setShowJoinModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Join a Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Room ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
            <Form.Text className="text-muted">
              Paste the room ID you received from a friend or colleague.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJoinModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={requestJoinRoom}>
            Join Room
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          onClose={() => setToast(null)}
          show
          delay={3000}
          autohide
          className={`position-fixed bottom-0 end-0 m-3 bg-${
            toast.type === "success" ? "success" : "danger"
          } text-white`}
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      )}
    </Container>
  );
}
