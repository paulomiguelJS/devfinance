const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transactions = [

    {
        id: 1,
        description: 'Eletric',
        amount: 7000000,
        date: '11/23/21'
    },
    {
        id: 2,
        description: 'Water',
        amount: -80000,
        date: '11/23/21'
    },
    {
        id: 3,
        description: 'Internet',
        amount: 50000,
        date: '11/23/21'
    },
]

const Transaction = {
    all: transactions,
    add(transaction) {
     Transaction.all.push(transaction)   

     App.reload()
   },
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })
        return income;
    },
    
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransctions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        value = Number(value.replace(/\D/g, "")) * 100
        
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })

       return signal + value
    }
}

const App = {
    init() {
   
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
      
    },
    reload() {
        DOM.clearTransctions()
        App.init()
    },
}

App.init()

