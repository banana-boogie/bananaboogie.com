import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import Icon from "@/components/Icon";
import Layout from "@components/Layout";
import UnstyledButton from "@/components/UnstyledButton";
import NewProjectModal from "@/components/NewProjectModal";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const projects = await prisma.project.findMany();
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects))
    }
  };
}

// TODO: Handle errors for create project

const Projects = ({ projects }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <Layout>
      <Wrapper>
        <Title>Projects</Title>
        <ProjectsWrapper>
          <NewProjectCard onClick={open}>
            <UnstyledButton>
              <Icon id="file-plus" color="white" />
            </UnstyledButton>
          </NewProjectCard>
          {projects.map((p, index) => {
            return (
              <Link href={`/mrt/projects/${p.id}`} passHref key={index}>
                <ProjectCard>{p.name}</ProjectCard>
              </Link>
            );
          })}
        </ProjectsWrapper>
        <NewProjectModal isOpen={showDialog} onDismiss={close} />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  margin-bottom: 250px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 36px;
`;

const ProjectsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: space-evenly;
  gap: 24px;
`;

const ProjectCard = styled.div`
  display: grid;
  place-content: center;
  min-height: 175px;
  max-width: 150px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='13' stroke-dasharray='15%2c 15%2c 1' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  cursor: pointer;
  font-size: 1.5rem; ;
`;

const NewProjectCard = styled(ProjectCard)`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='white' stroke-width='9' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 13px;
  cursor: pointer;
`;

export default Projects;
