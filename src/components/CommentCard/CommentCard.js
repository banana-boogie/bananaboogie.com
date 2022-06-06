import React from "react";
import axios from "axios";
import styled from "styled-components";

import { keywordsLabelled } from "@/contstants/mrt";
import { createKeywordRegex } from "@/utils";

import Icon from "@components/Icon";
import Highlighter from "@components/Highlighter";
import UnstyledButton from "@components/UnstyledButton";
import Loading from "@components/Loading";
import CommentTags from "@components/CommentTags";

const CommentCard = ({ data, name, projectId, projectTags = [] }) => {
  const initalTags = getInitialTags();
  const [clipboardCopied, setClipboardCopied] = React.useState({});
  const [commentSaved, setCommentSaved] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedTags, setSavedTags] = React.useState(
    initalTags.filter((t) => t.checked).map((t) => ({ id: t.id }))
  );
  const [savedCommentId, setSavedCommentId] = React.useState("");

  const highlightWords = Object.assign({}, keywordsLabelled, {
    tag: projectTags.map((t) => t.name)
  });

  async function copyToClipboard(data) {
    const { link, author, keywords, comment, postedAt } = data;

    const parsedComment = `${comment.replace(/[\n\r]/g, "")}`;
    const text = [link, keywords, parsedComment, author, postedAt].join("\t");

    await navigator.clipboard.writeText(text);
    setClipboardCopied({ [name]: true });

    setTimeout(setClipboardCopied.bind(null, {}), 1500);
  }

  function getKeywords() {
    return (data.keywords || [])
      .sort((a, b) => a.localeCompare(b))
      .map((k) => `${k[0].toUpperCase()}${k.slice(1)}`)
      .join(", ");
  }

  function getInitialTags() {
    const tagRegex = createKeywordRegex(projectTags.map((t) => t.name));
    const tagsFound = (data.comment.match(tagRegex) || []).map((t) =>
      t.toLowerCase()
    );

    return projectTags.map((t) => {
      t.checked = tagsFound.includes(t.name.toLowerCase());
      return t;
    });
  }

  const handleSelectedTags = (tags) => {
    setSavedTags(tags);
  };

  async function saveComment() {
    const { author, comment, keywords, link, subreddit } = data;
    const save = {
      author,
      link,
      comment,
      keywords,
      projectId,
      subreddit,
      tags: savedTags,
      postedAt: new Date(data.postedAt)
    };
    // setIsLoading(true);

    const { data: savedComment } = savedCommentId
      ? await axios.patch("/api/comments", { id: savedCommentId, ...save })
      : await axios.post("/api/comments", save);

    setIsLoading(false);
    setCommentSaved({ [name]: true }); // used to display saved screen, will disappear after
    setSavedCommentId(savedComment.id);
    setTimeout(setCommentSaved.bind(null, {}), 2500);
  }

  return (
    <Wrapper>
      {commentSaved[name] && <SavedNotification>SAVED!</SavedNotification>}
      {isLoading && (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
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
          <SaveButton onClick={saveComment}>
            <Icon id="save" color="white" />
          </SaveButton>
          <CommentTags
            comment={data.comment}
            tags={initalTags}
            handleSelectedTags={handleSelectedTags}
          />
        </ActionsWrapper>
      </Header>
      <Keywords>{getKeywords()}</Keywords>
      <TagsFound>
        {initalTags
          .filter((t) => t.checked)
          .map((t) => t.name)
          .sort((a, b) => a.localeCompare(b))
          .map((k) => `${k[0].toUpperCase()}${k.slice(1)}`)
          .join(", ")}
      </TagsFound>
      <CommentWrapper>
        <Comment>
          <Highlighter words={data.comment} highlightWords={highlightWords} />
        </Comment>
        <CommentCaption>
          <Author>{data.author}</Author>
          <DatePosted>{data.postedAt}</DatePosted>
        </CommentCaption>
      </CommentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-white);
  border: 1px solid var(--color-white);
  padding: 16px;
  position: relative;
  isolation: isolate;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Backdrop = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: grid;
  place-content: center;
  background: hsl(0deg 0% 0% / 0.9);
`;

const SavedNotification = styled(Backdrop)`
  font-size: 1.3rem;
`;

const LoadingWrapper = styled(Backdrop)``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Keywords = styled.p``;
const TagsFound = styled.p``;

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
  position: relative;
`;

const CopyWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  align-items: start;
  min-width: 60px;
  background: transparent;
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

const CommentWrapper = styled.figure`
  flex: 1;
  display: flex;
  flex-direction: column;
  & > * {
    flex: 1;
  }
`;
const Comment = styled.blockquote`
  margin-bottom: 24px;
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

export default CommentCard;
