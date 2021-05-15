import React, { useReducer } from "react";
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

type State = {
  editMode: boolean;
  newTitle: string;
};

type Action = {
  type: "setState";
  payload: {
    editMode?: boolean;
    newTitle?: string;
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const INITIAL_STATE = {
  editMode: false,
  newTitle: "",
};

function TodoItem({ onChange, ...itemData }: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => ({
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
    <Wrapper as="li">
      {!state.editMode ? (
        <>
          <Title completed={completed} onClick={handleTitleClick}>
            {title}
          </Title>
          <button title="Remove Task" onClick={handleRemoveClick}>
            Remove
          </button>
          <button title="Edit Task Title" onClick={handleEditClick}>
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            title="New title"
            value={state.newTitle}
            onChange={handleNewTitleChange}
          />
          <button title="Apply changes" onClick={handleApplyChangesClick}>
            Apply
          </button>
          <button title="Decline changes" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      )}
    </Wrapper>
  );
}

export default TodoItem;
