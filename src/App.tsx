import React from "react";
import TodoList from "./TodoList/TodoList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

function App() {
  return (
    <Wrapper>
      <TodoList />
    </Wrapper>
  );
}

export default App;
