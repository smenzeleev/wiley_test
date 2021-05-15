import React from "react";
import type { Item } from "./TodoList";
import StorageManager from "./StorageManager";
import { TodoList } from "./TodoList";
import { FlexBox } from "./common";

// Better to export once for a whole app
const storageManager = new StorageManager(global.localStorage, "TODO_APP");

const TODOS_STORAGE_KEY = "todos";

function App() {
  const storagedItems = storageManager.getItem<Item[]>(TODOS_STORAGE_KEY) || [];

  function handleTodoListChange(items: Item[]) {
    storageManager.setItem(TODOS_STORAGE_KEY, items);
  }

  return (
    <FlexBox justifyContent="center">
      <TodoList initialItems={storagedItems} onChange={handleTodoListChange} />
    </FlexBox>
  );
}

export default App;
