interface Transaction {
    id: number;
    description: string;
    amount: number;
}

type Action =
    | { type: "DELETE_TRANSACTION"; payload: number }
    | { type: "ADD_TRANSACTION"; payload: Transaction }
    | { type: "ADD_EXPENSE"; payload: Transaction };

export default (state: { transactions: Transaction[] }, action: Action) => {
    switch (action.type) {
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.payload
                ),
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };
        case "ADD_EXPENSE":
            const expenseTransaction = {
                ...action.payload,
                amount: -Math.abs(action.payload.amount) // Aquí se establece el valor como negativo
            };
            return {
                ...state,
                transactions: [expenseTransaction, ...state.transactions],
            };
        default:
            return state;
    }
}

//en "ADD_TRANSACTION" recibe el valor con el payload, y lo que debo hacer
//es una vez que se agrega una transaccion el estado debe cambiar
//tenemos que a;adir un nuevo valor, vas a copiar lo que tenemos ...state
//y vas a agregar la nueva transaccion  ...state,transactions: [action.payload, ...state]


//"DELETE_TRANSACTION" va a retornar una copia de todo el estado y luego hara una busqueda por id
//transactions: state.transactions.filter // 