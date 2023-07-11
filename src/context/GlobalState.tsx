import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
}
export interface ContextProps {
  transactions: Transaction[];
  addTransactionExpense: (transaction: Transaction) => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
}
interface Props {
  children: JSX.Element

}

const initialState = {
  transactions: [],
};

export const Context = createContext<ContextProps | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(Context)
  return context
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState,
    () => {
      const localData = localStorage.getItem("transactions")
      return localData ? JSON.parse(localData) : initialState;
    })

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const addTransaction = (transaction: Transaction) =>
    dispatch({
      type: "ADD_TRANSACTION", //nombre de la operacion que queremos ejecutar
      payload: transaction, //el dato que le voy a pasar
    });

  const addTransactionExpense = (transaction: Transaction) =>
    dispatch({
      type: "ADD_EXPENSE",
      payload: transaction,
    })

  const deleteTransaction = (id: number) =>
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });



  return (
    <Context.Provider
      value={{ transactions: state.transactions, addTransactionExpense, addTransaction, deleteTransaction }} >
      {children}
    </Context.Provider>
  );
};

// const deleteTransaction = (id)  en el delete transaction no necesito agregar una nueva transaccion , si no 
//que necesito borrar uno en especifico, y por eso pasamos la id, quie es unica 

// if (!context)
// throw new Error("useGlobalState must be used within a GlobalState");
// return context;
// const [state, dispatch] = useReducer(AppReducer, initialState, () => {
//   const localData = localStorage.getItem("transactions");  
//   return localData ? JSON.parse(localData) : initialState;   //si localdata exite enton ces conviertero, de lo contrario asigna el initialestate (que tiene el arreglo inicial)
// });

// useEffect(() => {
//   localStorage.setItem("transactions", JSON.stringify(state));
// }, [state]);   Aqui le digo, cuando el estado cambie, tui lo vas a guardar en el localstorage, llamado 'transactions'
//y se debe convertir a string, para que se pueda guardar,y no salga object object


