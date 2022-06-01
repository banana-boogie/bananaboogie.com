import axios from "axios";
import * as React from "react";
import styled from "styled-components";

import Layout from "@components/Layout";
import UnstyledButton from "@/components/UnstyledButton";
import Icon from "@/components/Icon";

const MRT = () => {
  return (
    <Layout>
      <Wrapper>
        <Title>Projects</Title>
        <NewProject>
          <UnstyledButton>
            <Icon id="file-plus" color="white" />
          </UnstyledButton>
        </NewProject>
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

const NewProject = styled.div`
  display: grid;
  place-content: center;
  min-height: 175px;
  max-width: 125px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='white' stroke-width='9' stroke-dasharray='15%2c 15%2c 1' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 12px;
`;

export default MRT;
