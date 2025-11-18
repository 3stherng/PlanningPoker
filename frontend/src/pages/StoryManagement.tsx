import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Tab, Tabs, Button } from "react-bootstrap";
import { StoryContext } from "../contexts/storyContext";
import { Get, Post } from "../communication";
import { StoryTable } from "../components/view_story/StoryTable";
import { EditStoryModal } from "../components/view_story/EditStoryModal";
import { AddStoryModal } from "../components/view_story/AddStoryModal";
import { FeedbackAlert } from "../components/view_story/FeedbackAlert";

export function ViewStory() {
  const [allStories, setAllStories] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState<any>(null);

  const { updateGroomingStoryID } = useContext(StoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { status, result } = await Get("/story/list");
    if (status) setAllStories(result);
  };

  const requestAddStory = async (title: string) => {
    const { status, result } = await Post("/story/add", { title });
    if (status) {
      setFeedback({ type: "success", message: "✅ Story added successfully!" });
      setAllStories(result);
    } else setFeedback({ type: "error", message: "⚠️ Failed to add story." });
  };

  const requestUpdateTitle = async (story_id: any, edited_title: string) => {
    const { status, result } = await Post("/story/update", {
      id: story_id,
      title: edited_title,
    });
    if (status) {
      setFeedback({
        type: "success",
        message: "✏️ Title updated successfully!",
      });
      setEditedTitle(result);
      fetchStories();
    } else
      setFeedback({ type: "error", message: "⚠️ Failed to update title." });
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
    requestUpdateTitle(editId, editedTitle);
    setShowEdit(false);
  };

  const handleClick = (story_id: any) => {
    navigate("/grooming");
    updateGroomingStoryID(story_id);
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
                onEdit={(id) => {
                  setEditId(id);
                  setShowEdit(true);
                }}
                onDelete={requestDeleteStory}
                onSize={handleClick}
              />
            </Tab>
            <Tab eventKey="active" title="Active Stories">
              <StoryTable
                stories={allStories}
                type="active"
                onEdit={() => {}}
                onDelete={requestDeleteStory}
                onSize={handleClick}
              />
            </Tab>
            <Tab eventKey="completed" title="Completed Stories">
              <StoryTable
                stories={allStories}
                type="completed"
                onEdit={() => {}}
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
        setEditedTitle={setEditedTitle}
      />
    </Row>
  );
}
