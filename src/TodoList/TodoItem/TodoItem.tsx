import React, { useReducer } from "react";
import styled from "styled-components";
import { ifProp } from "styled-tools";
import { FlexBox } from "../../common";
import type { Item } from "../TodoList.types";
import TodoItemReducer, { INITIAL_STATE } from "./TodoItemReducer";

const Title = styled.span<{ completed: Boolean }>`
  text-decoration: ${ifProp("completed", "line-through", "none")};
`;

interface Props extends Item {
  onChange: (item: Item, action: "change" | "remove") => void;
}

function TodoItem({ onChange, ...itemData }: Props) {
  const [state, dispatch] = useReducer(TodoItemReducer, INITIAL_STATE, () => ({
    ...INITIAL_STATE,
    newTitle: itemData.title,
  }));

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

  function handleEditClick() {
    dispatch({ type: "setState", payload: { editMode: true } });
  }

  function handleApplyChangesClick() {
    if (!state.newTitle) {
      alert("Title can not be empty!");
      return;
    }
    dispatch({ type: "setState", payload: { editMode: false } });
    onChange({ ...itemData, title: state.newTitle }, "change");
  }

  function handleCancelClick() {
    dispatch({
      type: "setState",
      payload: { editMode: false, newTitle: title },
    });
  }

  function handleNewTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    dispatch({ type: "setState", payload: { newTitle: value } });
  }

  return (
    <FlexBox as="li" margin="0 0 10px 0">
      {!state.editMode ? (
        <FlexBox direction="column">
          <FlexBox>
            <Title completed={completed} onClick={handleTitleClick}>
              {title}
            </Title>
          </FlexBox>
          <FlexBox justifyContent="space-between">
            <button title="Remove Task" onClick={handleRemoveClick}>
              Remove
            </button>
            <button title="Edit Task Title" onClick={handleEditClick}>
              Edit
            </button>
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox direction="column">
          <FlexBox>
            <input
              title="New title"
              value={state.newTitle}
              onChange={handleNewTitleChange}
              style={{ width: "100%" }}
            />
          </FlexBox>
          <FlexBox justifyContent="space-between">
            <button title="Apply changes" onClick={handleApplyChangesClick}>
              Apply
            </button>
            <button title="Decline changes" onClick={handleCancelClick}>
              Cancel
            </button>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
}

export default TodoItem;
