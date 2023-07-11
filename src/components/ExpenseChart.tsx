// import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from '../context/GlobalState'
import Chart from "react-apexcharts";


const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'radialBar',
    },
    labels: ['Saldo'],
    colors: ["#20E647"],
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
                size: "50%"
            },
            track: {
                background: '#333',
                startAngle: -135,
                endAngle: 135,
            },
            dataLabels: {
                show: true,
                name: {
                    offsetY: 0,
                    show: true,
                    color: "#a1a1a1",
                    fontSize: "1rem"
                },
                value: {
                    color: "#fff",
                    fontSize: "1rem",
                    show: true
                }
            }
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#bfe620"],
            stops: [0, 100]
        }
    },
    stroke: {
        lineCap: 'round',
    }
};

export const ExpenseChart = () => {

    const globalState = useGlobalState();
    const transactions = globalState?.transactions || [];

    if (transactions?.length === 0) return null

    const totalIncome = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transactions) => (acc += transactions.amount), 0)

    const totalExpense = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transactions) => (acc += transactions.amount), 0) * -1

    const totalExpensePorcentage = Math.round((totalExpense / totalIncome) * 100)

    const totalIncomePorcentage = 100 - totalExpensePorcentage

    const series = [totalIncomePorcentage]


    return (

        <Chart
            options={options}
            series={series}
            type="radialBar"
        />


    )
}

// data={
//     [
//         { x: 'Expenses', y: totalExpensePorcentage },
//         { x: 'Incomes', y: totalIncomePorcentage },

//     ]}
// animate={{
//     duration: 200
// }}
// labels={({ datum }) => `${datum.y}% `}
// labelComponent={<VictoryLabel angle={45} style={{ fill: 'white' }} />}