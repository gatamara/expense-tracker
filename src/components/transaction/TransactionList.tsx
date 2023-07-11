
import { useGlobalState } from '../../context/GlobalState'
import { TransactionItem } from './TransactionItem'



export const TransactionList = () => {

    const globalState = useGlobalState();
    const transactions = globalState?.transactions || [];

    return (
        <>
            <h3 className='text-slate-300 text-xl font-bold block pb-2 text-center '>Historial </h3>
            <ul >
                {
                    transactions.map(transaction =>
                        (<TransactionItem transaction={transaction} key={transaction.id} />)
                    )
                }
            </ul>

        </>
    )
}
