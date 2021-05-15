import type { Item } from "./TodoList.types";

export function sortTodoItemsInReverseOrder(items: Item[]) {
  return items.sort((a, b) => {
    return b.title.localeCompare(a.title);
  });
}
