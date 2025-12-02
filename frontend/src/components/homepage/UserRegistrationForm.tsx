import { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Feedback } from "../../types/grooming";

/**
 * Props for the UserRegistrationForm component.
 */
interface UserRegistrationFormProps {
  /**
   * The current username value.
   */
  username: string;

  /**
   * Callback invoked when username changes.
   */
  onUsernameChange: (username: string) => void;

  /**
   * Callback invoked when form is submitted.
   */
  onSubmit: (username: string) => void;

  /**
   * Optional feedback message to display.
   */
  feedback?: Feedback | null;

  /**
   * Optional callback to clear feedback.
   */
  onDismissFeedback?: () => void;
}

/**
 * User registration form component.
 *
 * Follows the Single Responsibility Principle by handling only
 * the form UI and validation. Business logic is delegated to
 * the parent component or hook (Dependency Inversion Principle).
 *
 * @example
 * ```tsx
 * <UserRegistrationForm
 *   username={username}
 *   onUsernameChange={setUsername}
 *   onSubmit={handleRegister}
 *   feedback={feedback}
 * />
 * ```
 */
export function UserRegistrationForm({
  username,
  onUsernameChange,
  onSubmit,
  feedback,
  onDismissFeedback,
}: UserRegistrationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username);
  };

  // Auto-dismiss feedback after 5 seconds
  useEffect(() => {
    if (feedback && onDismissFeedback) {
      const timer = setTimeout(() => {
        onDismissFeedback();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [feedback, onDismissFeedback]);

  return (
    <Form onSubmit={handleSubmit}>
      {feedback && (
        <Alert
          variant={feedback.type === "success" ? "success" : "danger"}
          className="text-center mb-4"
          dismissible={!!onDismissFeedback}
          onClose={onDismissFeedback}
        >
          {feedback.message}
        </Alert>
      )}

      <Form.Group className="mb-4" controlId="formUser">
        <Form.Label className="fw-semibold">Enter your name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Esther"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <div className="d-grid">
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="rounded-pill"
        >
          Join
        </Button>
      </div>
    </Form>
  );
}
