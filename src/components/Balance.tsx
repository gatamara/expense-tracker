import { useGlobalState } from "../context/GlobalState"
import { toCurrency } from "../utils";

export const Balance: React.FC = () => {

    const globalState = useGlobalState();
    const transactions = globalState?.transactions || [];

    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0)


    return (
        <div className=" py-2  flex flex-col items-center ">

            <h3 className="text-3xl font-bold"> {toCurrency(total.toString())} </h3>
            <h3 className="text-xl ">Balance</h3>
        </div>
    )
}
