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
        amount: -50000,
        date: '11/23/21'
    },
    {
        id: 2,
        description: 'Water',
        amount: 50000,
        date: '11/23/21'
    },
    {
        id: 3,
        description: 'Internet',
        amount: 50000,
        date: '11/23/21'
    },]

const Transaction = {
    incomes() {

    },
    expenses() {

    },
    total() {

    }
}

const DOM = {
    transactionsContainer: document.querySelector('data-table tbody'),

    addTransaction() {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmlTransaction()

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Util.formatCurrency(transaction.amount)

        const html = `
                        <td class="description">Project Completed</td>
                        <td class="expense">- $3.800,00</td>
                        <td class="date">06/01/2021</td>
                        <td><img src="./assets/minus.svg" alt="Remove Transaction"></td>         
        `
        return html
    },


}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLOcaleString("us", {
            style: "currency",
            currency: "en-US"
        })

        return signal + value
    }
}

DOM.addTransaction()

transactions.forEach(function (transaction) { })