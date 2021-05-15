import React from "react";
import TodoList from "./TodoList/TodoList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const testItems = [
  {
    id: "1",
    title: "sampletext",
    completed: false,
  },
  {
    id: "2",
    title: "sampletext",
    completed: false,
  },
];

function App() {
  return (
    <Wrapper>
      <TodoList initialItems={testItems} />
    </Wrapper>
  );
}

export default App;
