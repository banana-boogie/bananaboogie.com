import React from "react";
import styled from "styled-components";

import { createKeywordRegex } from "@/utils";

const Highlighter = ({ words, highlightWords }) => {
  let final = [];

  const keywords = Object.values(highlightWords).flat();
  const keywordCategories = Object.keys(highlightWords);
  const keywordRegex = createKeywordRegex(keywords);

  // Change all the keywords to lower case
  keywordCategories.forEach((category) => {
    highlightWords[category] = highlightWords[category].map((w) =>
      w.toLocaleLowerCase()
    );
  });

  words.split(" ").forEach((word, index) => {
    if (word.match(keywordRegex)) {
      const wordCategory = keywordCategories.find((category) => {
        return highlightWords[category].includes(word.toLocaleLowerCase())
          ? category
          : null;
      });

      final.push(
        <Highlight key={index} category={wordCategory}>
          {word}
        </Highlight>
      );
    } else {
      final.push(` ${word}`);
    }
  });

  return <>{final}</>;
};

const Highlight = styled.span`
  border-radius: 3px;
  font-size: 1.1rem;
  padding: 4px;
  margin: 2px;
  color: black;
  background: ${({ category }) => {
    let color = "";
    switch (category) {
      case "good":
        color = "hsl(120, 84%, 80%)";
        break;
      case "bad":
        color = "hsl(346, 84%, 61%)";
        break;
      case "tag":
        color = "hsl(69, 100%, 72%)";
        break;
    }
    return color;
  }};
`;

export default Highlighter;
