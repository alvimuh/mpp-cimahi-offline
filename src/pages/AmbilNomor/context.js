import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  loading: true,
  ctaDisabled: true,
  step: 0,
  instansi: [],
  instansiSelected: null,
  layanan: [],
  layananSelected: null,
  antrian: null,
};
const Context = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CLEAR": {
      return initialState;
    }
    case "LOADING": {
      return {
        ...state,
        loading: true,
        ctaDisabled: true,
      };
    }
    case "STOP_LOADING": {
      return {
        ...state,
        loading: false,
        ctaDisabled: false,
      };
    }
    case "SWITCH_STEP": {
      return {
        ...state,
        step: action.to,
      };
    }

    case "SET_INSTANSI": {
      return {
        ...state,
        loading: false,
        ctaDisabled: false,
        instansi: action.instansi,
      };
    }
    case "SET_LAYANAN": {
      return {
        ...state,
        loading: false,
        ctaDisabled: false,
        layanan: action.layanan,
        step: 1,
      };
    }
    case "SET_ANTRIAN": {
      return {
        ...state,
        antrian: action.data,
        step: 3,
      };
    }
    case "SWITCH_INSTANSI": {
      const selected = action.id !== state.instansiSelected ? action.id : null;
      return {
        ...state,
        loading: false,
        instansiSelected: selected,
        ctaDisabled: !selected,
      };
    }
    case "SWITCH_LAYANAN": {
      const selected = action.id !== state.layananSelected ? action.id : null;
      return {
        ...state,
        loading: false,
        layananSelected: selected,
        ctaDisabled: !selected,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function AntrianConsumer({ children }) {
  return <Context.Consumer>{children}</Context.Consumer>;
}
function AntrianProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
function useAntrian() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAntrian must be used within a AntrianProvider");
  }
  return context;
}

AntrianProvider.propTypes = {
  children: PropTypes.node,
};

export { AntrianProvider, AntrianConsumer, useAntrian };
