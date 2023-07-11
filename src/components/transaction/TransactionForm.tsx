import { useState } from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { toCurrency } from '../../utils';
import { getDigitsFromValue } from '../../utils/currency-mask';

function generateUniqueId(): number { return Math.floor(Math.random() * 1000000000); }

export const TransactionForm: React.FC = () => {

    const globalState = useGlobalState();
    const { addTransaction, addTransactionExpense } = globalState || {}
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState<string>()
    const [amountCurrency, setAmountCurrency] = useState<string>()

    console.log({ amount })

    const disableButtons = amount === ''

    const onSubmit = (e: any) => {
        e.preventDefault()
    }

    const addIncome = () => {
        if (addTransaction) {
            addTransaction({
                id: generateUniqueId(),
                description,
                amount: + Number(amount),
            });
            setAmount('');
            setAmountCurrency('')
            setDescription('');
        }
    };
    const addExpense = () => {
        if (addTransactionExpense) {
            addTransactionExpense({
                id: generateUniqueId(),
                description,
                amount: - Number(amount)
            })
        }
        setAmount('')
        setAmountCurrency('')
        setDescription('')

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const valueAsCurrency = toCurrency(event.target.value)
        const valueAsNumber: string = getDigitsFromValue(valueAsCurrency)

        event.persist()

        setAmount(valueAsNumber)
        setAmountCurrency(valueAsCurrency)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    className='bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full '
                    type="text"
                    placeholder='$0'
                    onChange={handleChange}
                    value={amountCurrency}
                />
                <input
                    className='bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full '
                    type="text"
                    placeholder='Introduce una descripcion'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />


                <div className='flex gap-2'>
                    <button onClick={addIncome} className='bg-emerald-500 text-white px-3 py-2 rounded-lg block mb-2 w-full' disabled={disableButtons} >Agregar Ingreso</button>
                    <button onClick={addExpense} className='bg-red-500 text-white px-3 py-2 rounded-lg block mb-2 w-full' disabled={disableButtons} >Agregar Gasto</button>
                </div>

            </form>
        </div>
    )
}


//  id: window.crypto.randomUUID , el navbedoor tiene esta funciuon para crear id unicos
// con una biblioteca que se llama crypto, y accedo a sau funcion llamada ramdomUUID