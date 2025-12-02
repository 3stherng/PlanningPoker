import { Button, Container, Row, Col } from "react-bootstrap";

interface VotingGridProps {
  votingOptions: (number | string)[];
  selectedStoryId: string | null;
  currentUserId: string | null;
  onVote: (
    storyId: string | null,
    userId: string | null,
    size: number | null,
  ) => void;
}

export function VotingGrid({
  votingOptions,
  selectedStoryId,
  currentUserId,
  onVote,
}: VotingGridProps) {
  return (
    <>
      <h5 className="fw-semibold mb-3">Vote your estimate</h5>
      <Container>
        <Row xs={3} md={4} className="g-3">
          {votingOptions.map((size, idx) => (
            <Col key={idx}>
              <Button
                variant="outline-primary"
                className="w-100 rounded-pill"
                size="lg"
                onClick={() => {
                  console.log("Vote click", {
                    selectedStoryId,
                    currentUserId,
                    size,
                  });
                  onVote(
                    selectedStoryId,
                    currentUserId,
                    size === "?" ? null : (size as number),
                  );
                }}
                disabled={selectedStoryId == null || currentUserId == null}
              >
                {size}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
