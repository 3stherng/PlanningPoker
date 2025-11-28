# Shared Components

This directory contains reusable UI components that are used across multiple features.

## Components

### FeedbackAlert
Generic alert component for displaying success/error feedback messages.
Uses the shared `Feedback` type from `src/types/grooming.ts`.

**Usage:**
```tsx
import { FeedbackAlert } from "../components/shared/FeedbackAlert";

function MyComponent() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  
  return <FeedbackAlert feedback={feedback} />;
}
```

## Design Principles

- Components here should be **generic** and **feature-agnostic**
- Should accept narrow, typed props
- Should be presentational (no business logic)
- Should be easily testable
