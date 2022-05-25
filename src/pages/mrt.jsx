import * as React from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import Icon from "@components/Icon";
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import TextInput from "@components/TextInput";
import UnstyledButton from "@components/UnstyledButton";

import { MRT as MRT_CONSTANTS } from "../contstants";

const MRT = () => {
  const keywordsDefault = MRT_CONSTANTS.keywords.join(", ");

  const [searchTerm, setSearchTerm] = React.useState("");
  const [subreddits, setSubreddits] = React.useState("");
  const [urls, setUrls] = React.useState("");
  const [keywords, setKeywords] = React.useState(keywordsDefault);
  const [searchData, setSearchData] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [clipboardCopied, setClipboardCopied] = React.useState({});

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await search();
    }
  }

  async function search() {
    const query = {
      searchTerm,
      keywords,
      subreddits,
      urls
    };
    try {
      setIsSearching(true);
      const response = await axios.post(`/api/search-reddit`, query);

      setSearchData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  async function copyToClipboard(data, key) {
    const { link, author, keywords, comment, postedAt } = data;

    const parsedComment = `${comment.replace(/[\n\r]/g, "")}`;
    const text = [link, keywords, parsedComment, author, postedAt].join("\t");

    await navigator.clipboard.writeText(text);
    setClipboardCopied({ [key]: true });

    setTimeout(setClipboardCopied.bind(null, {}), 1500);
  }

  return (
    <Layout>
      <Wrapper>
        {isSearching && <LoadingIcon id="loader" color="white" />}

        {!isSearching && !searchData && (
          <SearchWrapper>
            <SearchBar
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SubredditInput
              label="Subreddits"
              value={subreddits}
              onChange={(e) => setSubreddits(e.target.value)}
            />
            <UrlsInput
              label="URLs"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />
            <KeywordsInput
              label="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />

            <SearchButton onClick={async () => await search()}>
              Search
            </SearchButton>
          </SearchWrapper>
        )}

        {!isSearching && searchData && (
          <DataWrapper>
            {searchData.map((data, index) => {
              return (
                <PostWrapper key={index}>
                  <Comment>{data.comment}</Comment>
                  <Keywords>{(data.keywords || []).join(", ")}</Keywords>
                  <Author>{data.author}</Author>
                  <BottomWrapper>
                    <ThreadLink
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Original Thread
                    </ThreadLink>
                    <DatePosted>{data.postedAt}</DatePosted>
                    <CopyWrapper>
                      <CopyButton
                        onClick={async () => await copyToClipboard(data, index)}
                      >
                        <Icon id="copy" color="white" />
                      </CopyButton>
                      {clipboardCopied[index] && (
                        <CopyTooltip>Copied!</CopyTooltip>
                      )}
                    </CopyWrapper>
                  </BottomWrapper>
                </PostWrapper>
              );
            })}
          </DataWrapper>
        )}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  margin-bottom: 250px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SearchBar = styled(SearchInput)`
  width: 638px;
  height: 44px;
  border-radius: 3px;
  border: 2px solid var(--color-white);
`;

const SubredditInput = styled(TextInput)``;

const KeywordsInput = styled(TextInput)``;

const UrlsInput = styled(TextInput)``;

const SearchButton = styled(UnstyledButton)`
  border: 2px solid var(--color-yellow-500);
  margin-top: 24px;
  padding: 16px;
  color: var(--color-white);
  text-align: center;
  font-size: 1.5rem;

  &:hover {
    background: var(--color-yellow-500);
    color: black;
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
  max-width: 800px;
`;
const PostWrapper = styled.div`
  color: var(--color-white);
  border: 1px solid var(--color-white);
  padding: 16px;
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Comment = styled.p``;
const Keywords = styled.p``;

const ThreadLink = styled.a`
  color: var(--color-blue-600);
`;
const Author = styled.span``;
const DatePosted = styled.span``;

const CopyWrapper = styled.div`
  position: relative;
`;
const CopyTooltip = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px;
  color: black;
  background: var(--color-yellow-500);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: var(--font-weight-bold);
`;
const CopyButton = styled(UnstyledButton)``;

const rotate = keyframes`
  from{
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
`;

const LoadingIcon = styled(Icon)`
  display: grid;
  place-content: center;

  & > svg {
    animation: ${rotate} 2000ms infinite linear;
  }
`;

export default MRT;
