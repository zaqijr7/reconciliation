import { Moment } from "moment";
import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

// Tipe untuk satu task
type TypeState = {
  getInformationRecon: {
    dateTransaction: Moment | string;
    branch: string;
  };
};

// Tipe untuk action reducer
type Action = {
  type: "changed";
  payload: {
    key: "dateTransaction" | "branch";
    value: Moment | string;
  };
};

// Initial tasks
const initialState: TypeState = {
  getInformationRecon: {
    dateTransaction: "",
    branch: "",
  },
};

// Reducer function
function rootReducer(state: TypeState, action: Action): TypeState {
  switch (action.type) {
    case "changed": {
      return {
        ...state,
        getInformationRecon: {
          ...state.getInformationRecon,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    default: {
      throw new Error("Unknown action: " + (action as any).type);
    }
  }
}

// Contexts dengan tipe
const RootContext = createContext<TypeState | undefined>(undefined);
const RootDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined,
);

// Provider component
export function RootProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(rootReducer, initialState);

  return (
    <RootContext.Provider value={tasks}>
      <RootDispatchContext.Provider value={dispatch}>
        {children}
      </RootDispatchContext.Provider>
    </RootContext.Provider>
  );
}

// Hook untuk akses state
export function useRootState(): TypeState {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error("useRootState must be used within a RootProvider");
  }
  return context;
}

// Hook untuk akses dispatch
export function useRootStateDispatch(): Dispatch<Action> {
  const context = useContext(RootDispatchContext);
  if (context === undefined) {
    throw new Error("useRootStateDispatch must be used within a RootProvider");
  }
  return context;
}
