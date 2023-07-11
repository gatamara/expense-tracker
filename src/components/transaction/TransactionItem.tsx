import { useGlobalState, Transaction } from "../../context/GlobalState";
import { Trash } from "../../icons/Trash";
import { toCurrency } from "../../utils";

interface Props {
    transaction: Transaction;
}

export const TransactionItem: React.FC<Props> = ({ transaction }: Props) => {
    const globalState = useGlobalState();
    const deleteTransaction = globalState?.deleteTransaction;

    const isNegative = transaction.amount.toString()[0] === '-'

    return (
        <li className={`  text-white px-3 py-1 rounded-lg mb-2 w-full flex justify-between items-center ${isNegative ? 'bg-red-400' : 'bg-zinc-600'}`} >

            <p className="text-sm">{transaction.description} </p>

            <strong className="right-0">{toCurrency(transaction.amount.toString())}  </strong>
            <button className="py-1 bg-fuchsia-950 rounded-lg " onClick={() => {
                if (deleteTransaction) { deleteTransaction(transaction.id) };
            }}>
                <Trash color="#DBDDDF" />
            </button>


        </li>
    )
}
