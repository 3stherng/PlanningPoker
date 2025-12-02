import { Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { UserRegistrationForm } from "../components/homepage/UserRegistrationForm";

/**
 * Homepage component.
 *
 * Displays the application landing page with user registration.
 *
 * This component follows SOLID principles:
 * - Single Responsibility: Only handles page layout and orchestration
 * - Open/Closed: Easily extensible with new authentication methods
 * - Liskov Substitution: Components are interchangeable with same interface
 * - Interface Segregation: Each component has focused props
 * - Dependency Inversion: Depends on abstractions (useAuth hook) not implementations
 *
 * Business logic is delegated to useAuth hook, UI components handle their own rendering.
 */
export function Homepage() {
  const { username, setUsername, register, feedback, setFeedback } =
    useAuth("/story");

  return (
    <Row className="justify-content-center align-items-center vh-100 bg-light">
      <Col xs={12} md={8} lg={6}>
        <Card className="shadow-lg border-0 rounded-4 p-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary">Planning Poker</h1>
            <p className="text-muted">
              Collaborate, estimate, and plan smarter 🚀
            </p>
          </div>

          <UserRegistrationForm
            username={username}
            onUsernameChange={setUsername}
            onSubmit={register}
            feedback={feedback}
            onDismissFeedback={() => setFeedback(null)}
          />
        </Card>
      </Col>
    </Row>
  );
}
