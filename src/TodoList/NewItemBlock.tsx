import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FlexBox } from "../common";
import type { Item } from "./TodoList.types";

interface Props {
  onAdd: (item: Item) => void;
}

export function NewItemBlock({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    setTitle(value);
  }

  function handleAddClick(e: React.MouseEvent<HTMLButtonElement>) {
    const newItemData = {
      id: uuidv4(),
      title,
      completed: false,
    };
    onAdd(newItemData);
    setTitle("");
  }

  return (
    <FlexBox margin="10px 0 10px 0">
      <input type="text" value={title} onChange={handleChange} />
      <button onClick={handleAddClick} disabled={!Boolean(title)}>
        Add
      </button>
    </FlexBox>
  );
}

export default NewItemBlock;
