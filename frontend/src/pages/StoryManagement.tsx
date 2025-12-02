import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Tab, Tabs, Button } from "react-bootstrap";
import { StoryContext } from "../contexts/storyContext";
import { storyManagementService } from "../services/storyManagementService";
import { Feedback } from "../types/grooming";
import { Story, Room, StoryId, RoomId } from "../types/storyManagement";
import { StoryTable } from "../components/story_management/StoryTable";
import { AddStoryModal } from "../components/story_management/AddStoryModal";
import { FeedbackAlert } from "../components/shared/FeedbackAlert";
import { SelectRoomModal } from "../components/story_management/SelectRoomModal";

export function ViewStory() {
  const [stories, setStories] = useState<Story[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const { updateGroomingStoryID } = useContext(StoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadStories();
    loadRooms();
  }, []);

  const loadStories = async () => {
    try {
      const loadedStories = await storyManagementService.listStories();
      setStories(loadedStories);
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "Failed to load stories",
      });
    }
  };

  const loadRooms = async () => {
    try {
      const loadedRooms = await storyManagementService.listRooms();
      setRooms(loadedRooms);
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "Failed to load rooms",
      });
    }
  };

  const handleAddStory = async (title: string) => {
    try {
      const updatedStories = await storyManagementService.addStory(title);
      setStories(updatedStories);
      setFeedback({ type: "success", message: "✅ Story added successfully!" });
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "Failed to add story",
      });
    }
  };

  const handleDeleteStory = async (storyId: StoryId) => {
    try {
      await storyManagementService.deleteStory(storyId);
      setStories(stories.filter((s) => s.id !== storyId));
      setFeedback({
        type: "success",
        message: "🗑️ Story deleted successfully!",
      });
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message ?? "Failed to delete story",
      });
    }
  };

  const handleGroomStory = (storyId: StoryId) => {
    updateGroomingStoryID(storyId);
    setShowRoomModal(true);
  };

  const handleRoomSelect = (roomId: RoomId) => {
    navigate(`/grooming/${roomId}`);
  };

  return (
    <Row className="justify-content-center my-5">
      <Col xs={12} md={10}>
        <Card className="shadow-lg border-0 rounded-4 p-4">
          <Card.Header className="bg-white border-0 text-center">
            <h2 className="fw-bold text-primary">📖 Story Management</h2>
            <p className="text-muted">
              Manage, size, and track your planning poker stories
            </p>
          </Card.Header>

          <FeedbackAlert feedback={feedback} />

          <Tabs defaultActiveKey="all" className="mb-3">
            <Tab eventKey="all" title="All Stories">
              <StoryTable
                stories={stories}
                viewType="all"
                onDelete={handleDeleteStory}
                onGroom={handleGroomStory}
              />
            </Tab>
            <Tab eventKey="active" title="Active Stories">
              <StoryTable
                stories={stories}
                viewType="active"
                onDelete={handleDeleteStory}
                onGroom={handleGroomStory}
              />
            </Tab>
            <Tab eventKey="completed" title="Completed Stories">
              <StoryTable
                stories={stories}
                viewType="completed"
                onDelete={handleDeleteStory}
                onGroom={handleGroomStory}
              />
            </Tab>
          </Tabs>

          <Card.Footer className="bg-white border-0 text-center">
            <Button
              variant="primary"
              size="lg"
              className="rounded-pill"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Add Story
            </Button>
          </Card.Footer>
        </Card>
      </Col>

      {/* Modals */}
      <AddStoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStory}
      />
      <SelectRoomModal
        show={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        rooms={rooms}
        onConfirm={handleRoomSelect}
      />
    </Row>
  );
}
