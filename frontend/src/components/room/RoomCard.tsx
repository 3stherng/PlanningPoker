import { Card, Button } from "react-bootstrap";
import { Room } from "../../types/storyManagement";

/**
 * Props for the RoomCard component.
 */
interface RoomCardProps {
  /**
   * The room data to display.
   */
  room: Room;

  /**
   * Callback invoked when user clicks to enter the room.
   */
  onEnter: (roomId: string) => void;
}

/**
 * Displays a single room card with room information and action buttons.
 *
 * Follows the Single Responsibility Principle by only handling
 * the presentation of a single room card. Can be easily extended
 * with additional room actions (Open/Closed Principle).
 *
 * @example
 * ```tsx
 * <RoomCard room={room} onEnter={handleEnter} />
 * ```
 */
export function RoomCard({ room, onEnter }: RoomCardProps) {
  return (
    <Card className="shadow-sm border-0 rounded-3 hover-zoom">
      <Card.Body className="text-center">
        <Card.Title className="fw-bold">{room.name}</Card.Title>
        <Card.Text className="text-muted">ID: {room.id}</Card.Text>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="outline-primary" onClick={() => onEnter(room.id)}>
            🚪 Enter Room
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
