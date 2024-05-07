import React, { ReactNode, createContext, useContext, useReducer } from 'react';


type ImageFile = any; 
type AIResult = any;
type VehicleDetails = any; 

// Define the state shape
interface State {
  imageFiles: ImageFile[];
  vehicleDetails: VehicleDetails;
  ebayResult: any;
}

// Define the actions
type Action =
  | { type: 'SET_IMAGE_FILES'; payload: ImageFile[] }
  | { type: 'SET_VEHICLE_DETAILS'; payload: AIResult[] }
  | { type: 'SET_EBAY_RESULT'; payload: any }
  | { type: 'SET_ALL_NULL' };

// Define the initial state
const initialState: State = {
  imageFiles: [],
  vehicleDetails: {
    make: '',
    model: '',
    year: null,
    generatedWithModel: 'OpenAI'
  },
  ebayResult: {}
};

// Create the context
const MyContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Define the reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_IMAGE_FILES':
      return { ...state, imageFiles: action.payload };
    case 'SET_VEHICLE_DETAILS':
      return { ...state, vehicleDetails: action.payload };
    case 'SET_EBAY_RESULT':
      return { ...state, ebayResult: action.payload };
    case 'SET_ALL_NULL':
      return { ...initialState };
    default:
      return state;
  }
};

// Create the provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};

// Create a custom hook to use the context
export const useMyContext = () => useContext(MyContext);
