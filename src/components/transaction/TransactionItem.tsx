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
        <li className={`  text-white px-3 py-1 rounded-lg mb-2 w-full flex flex-row ${isNegative ? 'bg-red-400' : 'bg-zinc-600'}`} >

            <div className="basis-3/6">
                <p className="text-s">{transaction.description} </p>
            </div>
            <div className=" basis-2/6 flex flex-row-reverse">
                <strong className="right-0">{toCurrency(transaction.amount.toString())}  </strong>
            </div>
            <div className="basis-1/6 flex flex-row-reverse items-center">
                <button className="p-1 h-8  bg-fuchsia-950 rounded-lg " onClick={() => {
                    if (deleteTransaction) { deleteTransaction(transaction.id) };
                }}>
                    <Trash color="#DBDDDF" />
                </button>
            </div>
        </li>
    )
}
