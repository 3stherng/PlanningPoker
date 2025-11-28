import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Tab, Tabs, Button } from "react-bootstrap";
import { StoryContext } from "../contexts/storyContext";
import { Get, Post } from "../communication";
import { StoryTable } from "../components/view_story/StoryTable";
import { EditStoryModal } from "../components/view_story/EditStoryModal";
import { AddStoryModal } from "../components/view_story/AddStoryModal";
import { FeedbackAlert } from "../components/view_story/FeedbackAlert";
import { SelectRoomModal } from "../components/view_story/SelectRoomModal";

export function ViewStory() {
  const [allStories, setAllStories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);

  const [rooms, setRooms] = useState<any[]>([]);

  const { updateGroomingStoryID } = useContext(StoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
    fetchRooms();
  }, []);

  const fetchStories = async () => {
    const { status, result } = await Get("/story/list");
    if (status) setAllStories(result);
  };

  const fetchRooms = async () => {
    const { status, result } = await Get("/room/list");
    if (status) setRooms(result);
  };

  const requestAddStory = async (title: string) => {
    const { status, result } = await Post("/story/add", { title });
    if (status) {
      setFeedback({ type: "success", message: "✅ Story added successfully!" });
      setAllStories(result);
    } else setFeedback({ type: "error", message: "⚠️ Failed to add story." });
  };

  const requestDeleteStory = async (story_id: any) => {
    const { status } = await Post("/story/delete", { story_id });
    if (status) {
      setFeedback({ type: "success", message: "🗑️ Story deleted." });
      setAllStories(allStories.filter((s) => s.id !== story_id));
    } else
      setFeedback({ type: "error", message: "⚠️ Failed to delete story." });
  };

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestAddStory(title);
    setShowAdd(false);
  };

  const submitEditedTitle = () => {
    setShowEdit(false);
  };

  const handleClick = (story_id: any) => {
    updateGroomingStoryID(story_id);
    setShowRoomModal(true);
  };

  const handleRoomConfirm = (roomId: number) => {
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
                stories={allStories}
                type="all"
                onDelete={requestDeleteStory}
                onSize={handleClick}
              />
            </Tab>
            <Tab eventKey="active" title="Active Stories">
              <StoryTable
                stories={allStories}
                type="active"
                onDelete={requestDeleteStory}
                onSize={handleClick}
              />
            </Tab>
            <Tab eventKey="completed" title="Completed Stories">
              <StoryTable
                stories={allStories}
                type="completed"
                onDelete={() => {}}
                onSize={() => {}}
              />
            </Tab>
          </Tabs>

          <Card.Footer className="bg-white border-0 text-center">
            <Button
              variant="primary"
              size="lg"
              className="rounded-pill"
              onClick={() => setShowAdd(true)}
            >
              ➕ Add Story
            </Button>
          </Card.Footer>
        </Card>
      </Col>

      {/* Modals */}
      <AddStoryModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleSubmit}
        setTitle={setTitle}
      />
      <EditStoryModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        onConfirm={submitEditedTitle}
        setEditedTitle={() => {}}
      />
      <SelectRoomModal
        show={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        rooms={rooms}
        onConfirm={handleRoomConfirm}
      />
    </Row>
  );
}
