# Grooming Session Component Structure

This directory contains the refactored Grooming page, which is now split into smaller, reusable components for better readability and maintainability.

## Components

### Main Page
- **Grooming.tsx** - Main page component that orchestrates the grooming session
  - Manages all state and API calls
  - Coordinates between child components
  - Handles voting, players management, and moderation

### Sub-Components

#### 1. GroomingHeader.tsx
Displays the header section with story selection dropdown.
- **Props:**
  - `storyName`: Current selected story name
  - `selectedStoryId`: Current selected story ID
  - `allStories`: List of available stories
  - `feedback`: Feedback message to display
  - `onStorySelect`: Callback when story is selected

#### 2. VotingSession.tsx
Main voting interface component that combines voting grid and players list.
- **Props:**
  - `votingOptions`: Array of available vote options [1, 2, 3, ...]
  - `selectedStoryId`: Current selected story
  - `currentUserId`: Current user's ID
  - `allUsers`: List of all users
  - `allVotes`: List of current votes
  - `feedback`: Feedback message
  - `onVote`: Callback when user votes
  - `onSubmit`: Callback when submitting votes
  - `onRevote`: Callback when revoking votes

#### 3. VotingGrid.tsx
Displays the voting option buttons in a grid layout.
- **Props:**
  - `votingOptions`: Array of voting options
  - `selectedStoryId`: Current story ID
  - `currentUserId`: Current user ID
  - `onVote`: Vote submission callback

#### 4. PlayersList.tsx
Displays list of active players and their current votes.
- **Props:**
  - `allVotes`: List of votes with user info
  - `allUsers`: List of all users

#### 5. ActionButtons.tsx
Submit and Revote buttons for the voting session.
- **Props:**
  - `selectedStoryId`: Current story ID
  - `onSubmit`: Submit votes callback
  - `onRevote`: Clear votes callback

#### 6. PlayersManagement.tsx
Accordion section for managing players (make moderator, remove user).
- **Props:**
  - `activeUsers`: List of active users in the room
  - `moderator`: Current moderator ID
  - `feedback`: Feedback message
  - `onUpdateModerator`: Update moderator callback
  - `onDeleteUser`: Delete user callback

#### 7. StorySelector.tsx
Dropdown component for selecting a story.
- **Props:**
  - `selectedStoryId`: Current selected story ID
  - `allStories`: List of stories
  - `onStorySelect`: Selection callback

#### 8. ResultModal.tsx
Modal dialog showing the final story size result.
- **Props:**
  - `show`: Whether to show the modal
  - `averageSize`: The calculated average size
  - `onHide`: Close modal callback

## Data Flow

```
Grooming.tsx (Main Page)
├── State Management
│   ├── Voting session state
│   ├── Players management state
│   └── Context integration
├── API Calls
│   ├── fetchActiveUsers()
│   ├── fetchAllUsers()
│   ├── fetchStories()
│   ├── fetchAllVotes()
│   ├── requestCurrUserVote()
│   ├── requestRevote()
│   ├── requestSubmitVote()
│   ├── requestUpdateModerator()
│   └── requestDeleteUser()
└── Child Components
    ├── GroomingHeader
    │   └── StorySelector
    ├── VotingSession
    │   ├── VotingGrid
    │   ├── PlayersList
    │   └── ActionButtons
    ├── PlayersManagement
    └── ResultModal
```

## Benefits

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other pages
3. **Testability** - Smaller components are easier to unit test
4. **Maintainability** - Clear component boundaries make code easier to understand and modify
5. **Scalability** - Easy to add new features or modify existing ones

## State Organization

### Voting Session State
- `allUsers` - List of all users
- `allStories` - List of all stories
- `allVotes` - Current votes for the story
- `averageSize` - Calculated average size
- `showResult` - Result modal visibility
- `feedback` - User feedback messages

### Players Management State
- `activeUsers` - Users in the current room
- `moderator` - Current moderator ID
- `feedback1` - Moderator feedback messages

## API Endpoints Used

- `POST /user/active_users` - Get active users in a room
- `GET /user/list` - Get all users
- `GET /story/list/:room_id` - Get stories for a room
- `POST /size/allvotes` - Get votes for a story
- `POST /size/voting` - Submit a vote
- `POST /size/revote` - Clear votes for a story
- `POST /size/submit` - Submit final story size
- `POST /user/moderator` - Update moderator
- `POST /user/delete` - Delete a user from room
