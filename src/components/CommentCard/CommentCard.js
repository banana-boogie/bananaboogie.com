import React from "react";
import axios from "axios";
import styled from "styled-components";

import Icon from "@components/Icon";
import Highlighter from "@components/Highlighter";
import UnstyledButton from "@components/UnstyledButton";

const CommentCard = ({ data, name }) => {
  const [clipboardCopied, setClipboardCopied] = React.useState({});

  async function copyToClipboard(data) {
    const { link, author, keywords, comment, postedAt } = data;

    const parsedComment = `${comment.replace(/[\n\r]/g, "")}`;
    const text = [link, keywords, parsedComment, author, postedAt].join("\t");

    await navigator.clipboard.writeText(text);
    setClipboardCopied({ [name]: true });

    setTimeout(setClipboardCopied.bind(null, {}), 1500);
  }

  const getKeywords = () => {
    return (data.keywords || [])
      .sort((a, b) => a.localeCompare(b))
      .map((k) => `${k[0].toUpperCase()}${k.slice(1)}`)
      .join(", ");
  };

  function save() {
    axios.post("/api/comments", data);
  }

  return (
    <Wrapper>
      <Header>
        <ThreadLink href={data.link} target="_blank" rel="noopener noreferrer">
          <Icon id="link" color="var(--color-blue-600)" />
          {data.threadTitle}
        </ThreadLink>
        <ActionsWrapper>
          <CopyWrapper>
            <CopyButton onClick={async () => await copyToClipboard(data)}>
              <Icon id="copy" color="white" />
            </CopyButton>
            {clipboardCopied[name] && <CopyTooltip>Copied!</CopyTooltip>}
          </CopyWrapper>
          <SaveButton onClick={save}>
            <Icon id="save" color="white" />
          </SaveButton>
        </ActionsWrapper>
      </Header>
      <Keywords>{getKeywords()}</Keywords>
      <figure>
        <Comment>
          <Highlighter words={data.comment} />
        </Comment>
        <CommentCaption>
          <Author>{data.author}</Author>
          <DatePosted>{data.postedAt}</DatePosted>
        </CommentCaption>
      </figure>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-white);
  border: 1px solid var(--color-white);
  padding: 16px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Comment = styled.blockquote`
  margin-bottom: 12px;
  &::before {
    content: "“";
    font-size: 1.3rem;
    margin-right: 4px;
  }
  &::after {
    content: "”";
    font-size: 1.3rem;
    margin-left: 4px;
  }
`;
const CommentCaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
const Keywords = styled.p``;

const ThreadLink = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  font-size: 1.2rem;
  color: var(--color-blue-600);
`;
const Author = styled.span``;
const DatePosted = styled.span``;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const CopyWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  align-items: start;
  min-width: 60px;
`;
const CopyTooltip = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  color: black;
  background: var(--color-yellow-500);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: var(--font-weight-bold);
`;
const CopyButton = styled(UnstyledButton)``;

const SaveButton = styled(UnstyledButton)``;

export default CommentCard;
