import * as React from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import Icon from "@components/Icon";
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import TextInput from "@components/TextInput";

const IndexPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [subreddits, setSubreddits] = React.useState("thermomix");
  const [keywords, setKeywords] = React.useState("love, hate, sucks, best");
  const [searchData, setSearchData] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await search();
    }
  }

  async function search() {
    const query = {
      searchTerm,
      keywords,
      subreddits
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

  return (
    <Layout>
      <Wrapper>
        {isSearching && <LoadingIcon id="loader" />}

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
            <KeywordsInput
              label="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </SearchWrapper>
        )}

        {!isSearching && searchData && (
          <DataWrapper>
            {searchData.map((data, index) => {
              return (
                <PostWrapper key={index}>
                  <Comment>{data.comment}</Comment>
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
  gap: 16px;
`;

const SearchBar = styled(SearchInput)`
  width: 638px;
  height: 44px;
  border-radius: 3px;
  border: 2px solid var(--color-white);
`;

const SubredditInput = styled(TextInput)``;

const KeywordsInput = styled(TextInput)``;

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
const ThreadLink = styled.a`
  color: var(--color-blue-600);
`;
const Author = styled.span``;
const DatePosted = styled.span``;

const rotate = keyframes`
  from{
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
`;
const LoadingIcon = styled(Icon)`
  color: var(--color-primary);
  animation: ${rotate} 2000ms infinite linear;
`;

export default IndexPage;
