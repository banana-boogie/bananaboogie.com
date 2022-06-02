import React from "react";
import axios from "axios";
import Router from "next/router";
import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import Icon from "@/components/Icon";
import TextInput from "@/components/TextInput";
import UnstyledButton from "@/components/UnstyledButton";
import VisuallyHidden from "@/components/VisuallyHidden";

const NewProjectModal = ({ isOpen, onDismiss }) => {
  const [projectName, setProjectName] = React.useState("");

  async function createProject() {
    const response = await axios.post("/api/projects", { name: projectName });
    const { data } = response;

    Router.push(`/mrt/projects/${data.id}`);
  }

  const isCreateButtonDisabled = !projectName;

  return (
    <NewProjectWrapper isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="New Project">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss</VisuallyHidden>
        </CloseButton>
        <ProjectNameInput
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <CreateProjectButton
          onClick={async () => await createProject()}
          disabled={isCreateButtonDisabled}
        >
          Create Project
        </CreateProjectButton>
      </Content>
    </NewProjectWrapper>
  );
};
const NewProjectWrapper = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(0deg 0% 10% / 0.7);
  display: flex;
  padding: 144px;
`;

const Content = styled(DialogContent)`
  flex: 1;
  position: relative;
  background: white;
  display: grid;
  place-content: center;
  gap: 32px;
  border-radius: 12px;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const ProjectNameInput = styled(TextInput)`
  color: black;
`;

const CreateProjectButton = styled(UnstyledButton)`
  border: 1px solid black;
  color: ${(p) => (p.disabled ? "hsl(0deg 0% 50% / 0.5)" : "black")};
  padding: 8px;
  border-radius: 4px;

  background: ${(p) => (p.disabled ? "hsl(0deg 0% 50% / 0.5)" : "white")};
`;

export default NewProjectModal;
