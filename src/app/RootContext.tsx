"use client";
import { Moment } from "moment";
import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";

// Tipe untuk satu task
type TypeState = {
  getInformationRecon: {
    dateTransaction: Moment | string;
    branch: string;
  };
  getInformationReport: {
    date: Moment | string;
    branch: string;
  };
  getDashboadReport: {
    date: Moment | string;
    branch: string;
  };
  session: {
    token: string;
    user: string;
  };
};

// Tipe untuk action reducer
export type Action =
  | {
      type: "changed";
      payload: {
        key: "dateTransaction" | "branch";
        value: Moment | string;
      };
    }
  | {
      type: "changedStateReport";
      payload: {
        key: "date" | "branch";
        value: Moment | string;
      };
    }
  | {
      type: "changedStateDasboard";
      payload: {
        key: "date" | "branch";
        value: Moment | string;
      };
    }
  | {
      type: "login";
      payload: {
        value: {
          token: string;
          user: string;
        };
      };
    }
  | {
      type: "logout";
    };

// Initial tasks
const initialState: TypeState = {
  getInformationRecon: {
    dateTransaction: "",
    branch: "",
  },
  getInformationReport: {
    date: "",
    branch: "",
  },
  getDashboadReport: {
    date: "",
    branch: "",
  },
  session: {
    token: "",
    user: "",
  },
};

// Fungsi untuk memuat state dari localStorage
const loadState = (): TypeState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("reconState");
    if (savedState) {
      return JSON.parse(savedState);
    }
  }
  return initialState;
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
    case "changedStateReport": {
      return {
        ...state,
        getInformationReport: {
          ...state.getInformationReport,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    case "changedStateDasboard": {
      return {
        ...state,
        getDashboadReport: {
          ...state.getDashboadReport,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    case "login": {
      return {
        ...state,
        session: {
          ...action.payload.value,
        },
      };
    }
    case "logout": {
      return initialState;
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
  // Menggunakan state yang dimuat dari localStorage atau initialState
  const [tasks, dispatch] = useReducer(rootReducer, loadState());

  // Menyimpan state ke localStorage setiap kali state berubah
  useEffect(() => {
    localStorage.setItem("reconState", JSON.stringify(tasks));
  }, [tasks]);

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
