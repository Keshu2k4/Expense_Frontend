import { useState } from "react"
import { useEffect } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseItem from "./components/ExpenseItem"
import axios from "axios"
const App = () => {
  const [expenses, setExpenses]  = useState([
])
useEffect(() =>{
  axios.get("https://exp-tracker-api-3k5r.onrender.com/get-entries").then(res => {console.log(res)
setExpenses(res.data)})
  .catch(err => console.log(err))
}, [])

const addExpense = (title, amount) => {
  const nextId = expenses[expenses.length-1].id + 1
  setExpenses([...expenses, { id :nextId, title: title, amount: amount}])
  axios.post('https://exp-tracker-api-3k5r.onrender.com/sign-in', ({title : title, amount : amount}))
}
const deleteExpense = (id) => {
  setExpenses(expenses.filter((exp) => exp.id !== id))
}
let income = 0
let spent = 0
expenses.forEach((exp) => {
  if(exp.amount>0) {
    income += exp.amount
  } else {
    spent -= exp.amount
  }
})
  return (
    <>
    <div>
      <div className="heading">Expense Tracker
      <div className="balance">Balance ---: {income-spent}</div></div>
      <div className="income-expense-container">
      <div className="income">
        <span className="title">Income</span>
        <span>{income}</span>
    </div>
    <div className="block"></div>
          <div className="expense">
            <span className="title">Expenditure</span>
            <span>{spent}</span>
            </div>
          </div>
    </div>
    <div>
      <ExpenseForm addExpense={addExpense}
      />
    </div>
    {expenses.map((expense) => (
      <ExpenseItem key = {expense.id} title={expense.title} amount={expense.amount} id={expense.id} deleteExpense={deleteExpense}/>
    ))}
    </>
  )
}
export default App