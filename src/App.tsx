import { Balance } from './components/Balance'
import { ExpenseChart } from './components/ExpenseChart'

import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionForm } from './components/transaction/TransactionForm'
import { TransactionList } from './components/transaction/TransactionList'
import { GlobalProvider } from './context/GlobalState'

function App() {

  return (
    <GlobalProvider>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white min-h-screen flex justify-center items-center">
        <div className="w-5/6 flex justify-center items-center">
          <div className="bg-neutral-800 p-5 rounded-md w-full">
            <h1 className='text-2xl font-bold py-2 mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500'> Registro de Gastos</h1>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <ExpenseChart />
                <IncomeExpenses />
                <Balance />
                <TransactionForm />
              </div>
              <div className="flex flex-col flex-1">

                <TransactionList />

              </div>

            </div>

          </div>


        </div>

      </div>


    </GlobalProvider>
  )
}

export default App

