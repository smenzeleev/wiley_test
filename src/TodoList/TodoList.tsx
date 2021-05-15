import React from "react";
import * as s from "./TodoList.style";

const testItems = [
  {
    id: 1,
    title: "sampletext",
  },
  {
    id: 2,
    title: "sampletext",
  },
];

function TodoList() {
  return (
    <s.Wrapper>
      <s.List>
        {testItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </s.List>
    </s.Wrapper>
  );
}

export default TodoList;
