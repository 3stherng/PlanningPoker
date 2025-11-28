import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface SelectRoomModalProps {
  show: boolean;
  onClose: () => void;
  rooms: any[];
  onConfirm: (roomId: number) => void;
}

export function SelectRoomModal({ show, onClose, rooms, onConfirm }: SelectRoomModalProps) {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selectedRoom) {
      onConfirm(selectedRoom);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          value={selectedRoom ?? ""}
          onChange={(e) => setSelectedRoom(Number(e.target.value))}
        >
          <option value="">-- Choose a room --</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              Room {room.id} - {room.name}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={!selectedRoom}>
          Join Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
