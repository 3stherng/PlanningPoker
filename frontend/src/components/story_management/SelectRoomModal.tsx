import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Room, RoomId } from "../../types/storyManagement";

interface SelectRoomModalProps {
  show: boolean;
  onClose: () => void;
  rooms: Room[];
  onConfirm: (roomId: RoomId) => void;
}

export function SelectRoomModal({
  show,
  onClose,
  rooms,
  onConfirm,
}: SelectRoomModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId | null>(null);

  const handleConfirm = () => {
    if (selectedRoomId) {
      onConfirm(selectedRoomId);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedRoomId(null);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Room for Grooming</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Available Rooms</Form.Label>
          <Form.Select
            value={selectedRoomId ?? ""}
            onChange={(e) => setSelectedRoomId(String(e.target.value))}
          >
            <option value="">-- Choose a room --</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} (ID: {room.id})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedRoomId}
        >
          Join Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
