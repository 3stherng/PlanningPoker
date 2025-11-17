import { ListGroup, Badge } from "react-bootstrap";

export function PlayerList({ votes }: { votes: any[] }) {
  return (
    <ListGroup>
      {votes.map((vote, idx) => (
        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">{vote.user}</span>
          <Badge bg="primary" pill>
            {vote.size ?? "?"}
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
