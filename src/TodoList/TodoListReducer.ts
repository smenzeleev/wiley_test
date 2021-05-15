import type { Item } from "./TodoList.types";

type State = {
  items: Item[];
};

type AddItemAction = {
  type: "items/add";
  item: Item;
};

type RemoveItemAction = {
  type: "items/remove";
  id: string;
};

type UpdateItemAction = {
  type: "items/update";
  item: Item;
};

type Action = AddItemAction | RemoveItemAction | UpdateItemAction;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ACTION_TYPES.addItem:
      return { ...state, items: [...state.items, action.item] };
    case ACTION_TYPES.removeItem:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case ACTION_TYPES.updateItem:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.item.id ? action.item : item
        ),
      };
    default:
      return state;
  }
}

export const ACTION_TYPES = {
  addItem: "items/add",
  removeItem: "items/remove",
  updateItem: "items/update",
} as const;

export const INITIAL_STATE = {
  items: [],
};

export default reducer;
