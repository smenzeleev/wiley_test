import React from "react";
import type { Item } from "./TodoList";
import StorageManager from "./StorageManager";
import TodoList from "./TodoList/TodoList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

// Better to export once for a whole app
const storageManager = new StorageManager(global.localStorage, "TODO_APP");

const TODOS_STORAGE_KEY = "todos";

function App() {
  const storagedItems = storageManager.getItem<Item[]>(TODOS_STORAGE_KEY) || [];

  function handleTodoListChange(items: Item[]) {
    storageManager.setItem(TODOS_STORAGE_KEY, items);
  }

  return (
    <Wrapper>
      <TodoList initialItems={storagedItems} onChange={handleTodoListChange} />
    </Wrapper>
  );
}

export default App;
