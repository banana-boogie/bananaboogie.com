import * as React from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

import Icon from "@components/Icon";
import Layout from "@components/Layout";
import SearchInput from "@components/SearchInput";
import TextInput from "@components/TextInput";
import UnstyledButton from "@components/UnstyledButton";
import CommentCard from "@/components/CommentCard";

import { MRT as MRT_CONSTANTS } from "@/contstants";
import Loading from "@/components/Loading";

const MRT = () => {
  const keywordsDefault = MRT_CONSTANTS.keywords.join(", ");

  const [searchTerm, setSearchTerm] = React.useState("");
  const [subreddits, setSubreddits] = React.useState("");
  const [urls, setUrls] = React.useState("");
  const [keywords, setKeywords] = React.useState(keywordsDefault);
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

  return (
    <Layout>
      <Wrapper>
        {isSearching && <Loading />}

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
            <BackButtonWrapper>
              <BackButton
                onClick={() => {
                  setSearchData(null);
                }}
              >
                Go Back
              </BackButton>
            </BackButtonWrapper>
            {searchData.map((data, index) => {
              return <CommentCard data={data} key={index} name={index} />;
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
  isolation: isolate;
`;
const BackButtonWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  height: 100px;
  width: 100%;
  background: var(--color-background);
  display: flex;
  align-items: center;
`;
const BackButton = styled(UnstyledButton)`
  font-size: 1.3rem;
  text-decoration: underline;
`;

export default MRT;
