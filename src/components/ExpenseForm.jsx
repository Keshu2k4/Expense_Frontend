import { useState } from "react"


const ExpenseForm=(props) => {
    const{ addExpense } = props
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [errors, setErrors] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(title, amount)
           let err = {}
        if(title.length<3){
           err.title = 'Title should be atleast 3 characters long' 
        }
        if(!amount){
            err.amount = 'Please enter a valid amount'
        }
        if(Object.keys(err).length>0){
            setErrors({...err})
            return
        }
        addExpense(title, amount)
        setTitle('')
        setAmount(0)
    }
    const handleTitleChange = (e) => { 
        setTitle(e.target.value)
    }
    const handleAmountChange = (e) => {
        setAmount(parseInt(e.target.value))
    }
  return (
    <div className="textfield">
    <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange}/>
           {errors.title ? <div className="error">{errors.title}</div> : null}
            </div>
            <div className="input-container">
                <label htmlFor="amount">Amount</label>
                <input type="number"  id="amount" value={amount} onChange={handleAmountChange}/>
                {errors.amount ? <div className="error">{errors.amount}</div> : null}
            </div>
            <div className="delete">
                
            </div>
            <div className="but">
                <button type="submit">
                    Add Expense
                 </button>
                 </div>
    </form>
    </div>
  )
}

export default ExpenseForm