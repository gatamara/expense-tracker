import { useGlobalState, Transaction } from "../context/GlobalState"
import { toCurrency } from "../utils";


export const IncomeExpenses: React.FC = () => {

    const globalState = useGlobalState();
    const transactions = globalState?.transactions || [];

    const amounts = transactions.map((transaction: Transaction) => transaction.amount)

    const income = amounts
        .filter((item: number) => item > 0)
        .reduce((acc: number, item: number) => (acc += item), 0)


    const expense = amounts
        .filter((item: number) => item < 0)
        .reduce((acc: number, item: number) => (acc += item), 0)
        * -1  //toFixed para redondear a dos decimales

    return (
        <div className="flex justify-around ">
            <div className="flex flex-col items-center my-1 text-xs text-gray-400/50 ">
                <strong> Ingresos </strong>
                <p className="text-gray-200"> {toCurrency(income.toString())} </p>
            </div>
            <div className="flex flex-col items-center  my-1 text-xs text-gray-400/50">
                <strong>Gastos</strong>
                <p className="text-gray-200">{toCurrency(expense.toString())}</p>
            </div>
        </div>

    )
}


//const { transactions } = useGlobalState() accedo al estado goblar, y traigo el arreglo de las transacciones
// transactions.map(transaction => transaction.amount) recorro el array y busco solo el monto

//const expense = amounts.filter(item => item < 0)  aqui me da solo los valores negativos
