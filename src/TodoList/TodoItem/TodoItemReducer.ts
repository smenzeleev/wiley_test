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

export const INITIAL_STATE = {
  editMode: false,
  newTitle: "",
};

export default reducer;
