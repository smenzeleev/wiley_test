import React, { useEffect, useReducer, useRef } from "react";
import reducer, { INITIAL_STATE, ACTION_TYPES } from "./TodoListReducer";
import type { Item } from "./TodoList.types";
import * as s from "./TodoList.style";
import NewItemBlock from "./NewItemBlock";
import { sortTodoItemsInReverseOrder } from "./helpers";
import { FlexBox } from "../common";
import { TodoItem } from "./TodoItem";

interface Props {
  initialItems?: Item[];
  onChange?: (items: Item[]) => void;
}

function TodoList({ initialItems, onChange }: Props) {
  const isMounted = useRef(false);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => ({
    ...INITIAL_STATE,
    items: initialItems ? sortTodoItemsInReverseOrder(initialItems) : [],
  }));

  function addItem(item: Item) {
    dispatch({ type: ACTION_TYPES.addItem, item });
  }

  function hanleChangeTodoItem(item: Item, action: "change" | "remove") {
    if (action === "change") {
      dispatch({ type: ACTION_TYPES.updateItem, item });
    } else {
      const answer = global.confirm(
        `Are you sure that you want remove task ${item.title}?`
      );
      if (answer) {
        dispatch({ type: ACTION_TYPES.removeItem, id: item.id });
      }
    }
  }

  useEffect(() => {
    if (onChange && isMounted.current) {
      onChange(state.items);
    }
    isMounted.current = true;
  }, [onChange, state.items]);

  const { items } = state;

  return (
    <FlexBox direction="column" width="auto">
      <FlexBox>
        <h3>Todo list:</h3>
      </FlexBox>

      <NewItemBlock onAdd={addItem} />

      <FlexBox>
        <s.List>
          {items.map((item) => (
            <TodoItem key={item.id} {...item} onChange={hanleChangeTodoItem} />
          ))}
        </s.List>
      </FlexBox>
    </FlexBox>
  );
}

export default TodoList;
