import React from "react";
import styled from "styled-components";
import { ifProp } from "styled-tools";
import { FlexBox } from "../common";
import type { Item } from "./TodoList.types";

const Title = styled.span<{ completed: Boolean }>`
  text-decoration: ${ifProp("completed", "line-through", "none")};
`;

const Wrapper = styled(FlexBox)`
  user-select: none;
`;

interface Props extends Item {
  onChange: (item: Item, action: "change" | "remove") => void;
}

function TodoItem({ onChange, ...itemData }: Props) {
  const { title, completed } = itemData;

  function handleTitleClick() {
    onChange(
      {
        ...itemData,
        completed: !itemData.completed,
      },
      "change"
    );
  }

  function handleRemoveClick() {
    onChange(itemData, "remove");
  }

  return (
    <Wrapper as="li">
      <Title completed={completed} onClick={handleTitleClick}>
        {title}
      </Title>
      <button onClick={handleRemoveClick}>Remove</button>
    </Wrapper>
  );
}

export default TodoItem;
