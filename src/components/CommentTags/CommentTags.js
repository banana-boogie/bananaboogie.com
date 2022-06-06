import React from "react";
import styled from "styled-components";

import Icon from "@components/Icon";
import Checkbox from "@components/Checkbox";
import UnstyledButton from "@components/UnstyledButton";
import ClickOutsideDetector from "@components/ClickOutsideDetector";

/**
 * BUGS TO FIX:
 * BUG: tagID/CommentId unique constraint
 * BUG: saving comments after changing tag saves a new row
 */
//  --------------------------------------------------------
// TODO: create multi-select input component: used by tags, and keywords
// ------------------------------------------------------------------------
// TODO: Light/Dark mode theme

const CommentTags = ({ tags, handleSelectedTags }) => {
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState(
    tags.filter((t) => t.checked).map((t) => ({ id: t.id }))
  );
  const openDropdown = () => setOpenDropdown(true);
  const closeDropdown = () => {
    setOpenDropdown(false);
    handleSelectedTags(selectedTags);
  };

  const handleSelectTag = (tag) => {
    const updatedTags = tag.checked
      ? selectedTags.concat({ id: tag.name })
      : // tag is returned from the on change
        // tag: { checked, name: 'id'}
        selectedTags.filter((t) => t.id !== tag.name);

    setSelectedTags(updatedTags);
  };

  return (
    <Wrapper>
      <TagButton onClick={openDropdown}>
        <Icon id="tag" color="white" />
      </TagButton>
      <ClickOutsideDetector listen onClickOutside={closeDropdown}>
        <Dropdown isOpen={isOpenDropdown}>
          <CloseButton onClick={closeDropdown}>
            <Icon id="close" color="black" size={26} />
          </CloseButton>
          {tags.map((t, index) => (
            <Checkbox
              key={index}
              name={t.id}
              id={t.id}
              label={t.name}
              value={t.checked}
              handleCheck={handleSelectTag}
            />
          ))}
        </Dropdown>
      </ClickOutsideDetector>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const TagButton = styled(UnstyledButton)``;

const Dropdown = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 4px;
  position: absolute;
  top: 0;
  right: 0;
  height: 275px;
  width: 250px;
  padding: 24px;
  padding-top: 32px;
  background: white;
  overflow: auto;
  border-radius: 4px;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const NewTag = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const NewTagTitle = styled.span`
  color: black;
  transform: translateY(2px);
`;

export default CommentTags;
