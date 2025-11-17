import { Row, Col, Button, Container } from "react-bootstrap";

export function VotingGrid({
  options,
  onVote,
}: {
  options: (number | string)[];
  onVote: (size: number | null) => void;
}) {
  return (
    <Container>
      <Row xs={3} md={4} className="g-3">
        {options.map((size, idx) => (
          <Col key={idx}>
            <Button
              variant="outline-primary"
              className="w-100 rounded-pill"
              size="lg"
              onClick={() => onVote(size === "?" ? null : (size as number))}
            >
              {size}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
