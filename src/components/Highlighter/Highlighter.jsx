import React from "react";
import styled from "styled-components";

import { createKeywordRegex } from "@/utils";
import { keywordsLabelled, keywords } from "@/contstants/mrt";

const Highlighter = ({ words }) => {
  let final = [];

  const keywordRegex = createKeywordRegex(keywords);

  words.split(" ").forEach((word, index) => {
    const keywordMatch = word.match(keywordRegex);
    if (keywordMatch) {
      const isGoodWord = !!keywordsLabelled.good.find(
        (e) => e.toLocaleLowerCase() === keywordMatch[0].toLocaleLowerCase()
      );
      final.push(
        <Highlight key={index} isGood={isGoodWord}>
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
  background: ${(p) =>
    p.isGood ? "hsl(69, 100%, 72%)" : "hsl(346, 84%, 61%)"};
`;

export default Highlighter;
