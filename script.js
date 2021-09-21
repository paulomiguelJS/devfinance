const Modal = {
<<<<<<< HEAD
    open() {
      document.querySelector(".modal-overlay").classList.add("active");
      Form.clearFields()
    },
    close() {
      document.querySelector(".modal-overlay").classList.remove("active");
      Form.clearFields()
    },
  };
  
  const Storage = {
    get() {
      return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
    },
    set(transactions) {
      localStorage.setItem(
        "dev.finances:transactions",
        JSON.stringify(transactions)
      );
    },
  };
  
  const Transaction = {
    all: Storage.get(),
    add(transaction) {
      Transaction.all.push(transaction);
  
      App.reload();
    },
  
    remove(index) {
      Transaction.all.splice(index, 1);
      App.reload();
    },
  
    incomes() {
      let income = 0;
      Transaction.all.forEach(transaction => {
          if (transaction.amount > 0) {
              income += transaction.amount;
          }
=======
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
    Form.clearFields()
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
    Form.clearFields()
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    );
  },
};

const Transaction = {
  all: Storage.get(),
  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => { //Your amount is never negative, What determines if the amount it's an expense is transaction.type
        if (transaction.type === 'expense') {
            income += transaction.amount;
        }
    })
    return income;
},

expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
        if (transaction.amount < 0) {
            expense += transaction.amount;
        }
    })
    return expense;
},
total() {
    return Transaction.incomes() + Transaction.expenses();
},
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const type = transaction.type

    const amount = Utils.formatCurrency(transaction.amount);
    console.log(amount);
    const html = `
        <td class="description">${transaction.description}</td>
        <td class="${type}">${type === "income" ? amount : "-" + amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `;
        

    return html;
  },

  updateBalance() {
    console.log(document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes()))
   console.log( document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses()))
    document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
},


  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\.\,/g, "")) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return signal + value;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  selectedType: "",
  transactionTypeBtn: document.querySelectorAll(".transactionType button"),

  btnTransaction(index) {
    Form.transactionTypeBtn.forEach((btnTransaction) =>
      btnTransaction.classList.remove("active")
    );
    if (Form.selectedType.trim === "") {
        Form.removeBtnClassLIst()
    }
    Form.transactionTypeBtn[index].classList.add("active");
  },

  removeBtnClassLIst() {
    Form.transactionTypeBtn.forEach((btnTransaction) =>
      btnTransaction.classList.remove("active")
    );
  },

  handleChangedType() {
    Form.transactionTypeBtn.forEach((btnTransaction, index) =>
      btnTransaction.addEventListener("click", (e) => {
        Form.btnTransaction(index);
        Form.selectedType = e.target.dataset.button;
>>>>>>> refs/remotes/origin/main
      })
      return income;
  },
  
  expenses() {
      let expense = 0;
      Transaction.all.forEach(transaction => {
          if (transaction.amount < 0) {
              expense += transaction.amount;
          }
      })
      return expense;
  },
  total() {
      return Transaction.incomes() + Transaction.expenses();
  },
  };
  
  const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
  
    addTransaction(transaction, index) {
      const tr = document.createElement("tr");
      tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
      tr.dataset.index = index;
  
      DOM.transactionsContainer.appendChild(tr);
    },
  
    innerHTMLTransaction(transaction, index) {
      const type = transaction.type
  
      const amount = Utils.formatCurrency(transaction.amount);
      console.log(amount);
      const html = `
          <td class="description">${transaction.description}</td>
          <td class="${type}">${type === "income" ? amount : "-" + amount}</td>
          <td class="date">${transaction.date}</td>
          <td>
              <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
          </td>
          `;
          
  
      return html;
    },
  
    updateBalance() {
      console.log(document
          .getElementById('incomeDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.incomes()))
     console.log( document
          .getElementById('expenseDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.expenses()))
      document
          .getElementById('totalDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  
  
    clearTransactions() {
      DOM.transactionsContainer.innerHTML = "";
    },
  };
  
  const Utils = {
    formatAmount(value) {
      value = Number(value.replace(/\.\,/g, "")) * 100;
  
      return value;
    },
  
    formatDate(date) {
      const splittedDate = date.split("-");
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },
  
    formatCurrency(value) {
      const signal = Number(value) < 0 ? "-" : "";
  
      value = String(value).replace(/\D/g, "");
  
      value = Number(value) / 100;
  
      value = value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      return signal + value;
    },
  };
  
  const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),
    selectedType: "",
    transactionTypeBtn: document.querySelectorAll(".transactionType button"),
  
    btnTransaction(index) {
      Form.transactionTypeBtn.forEach((btnTransaction) =>
        btnTransaction.classList.remove("active")
      );
      if (Form.selectedType.trim === "") {
          Form.removeBtnClassLIst()
      }
      Form.transactionTypeBtn[index].classList.add("active");
    },
  
    removeBtnClassLIst() {
      Form.transactionTypeBtn.forEach((btnTransaction) =>
        btnTransaction.classList.remove("active")
      );
    },
  
    handleChangedType() {
      Form.transactionTypeBtn.forEach((btnTransaction, index) =>
        btnTransaction.addEventListener("click", (e) => {
          Form.btnTransaction(index);
          Form.selectedType = e.target.dataset.button;
        })
      );
    },
  
    getValues() {
      return {
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value,
        type: Form.selectedType,
      };
    },
  
    validateFields() {
      const { description, amount, date, type } = Form.getValues();
      if (
        description.trim() === "" ||
        amount.trim() === "" ||
        date.trim() === "" ||
        type.trim() === ""
      ) {
        throw new Error("Please, fill out all the required fields");
      }
    },
  
    formatValues() {
      let { description, amount, date, type } = Form.getValues();
  
      amount = Utils.formatAmount(amount);
  
      date = Utils.formatDate(date);
  
      return {
        description,
        amount,
        date,
        type,
      };
    },
  
    clearFields() {
      Form.description.value = "";
      Form.amount.value = "";
      Form.date.value = "";
      Form.removeBtnClassLIst();
    },
  
    submit(event) {
      event.preventDefault();
  
      try {
        Form.validateFields();
        const transaction = Form.formatValues();
        Transaction.add(transaction);
        Modal.close();
        Form.clearFields();
      } catch (error) {
        alert(error.message);
      }
    },
  };
  
  const App = {
    init() {
      Transaction.all.forEach(DOM.addTransaction);
  
      DOM.updateBalance();
  
      Storage.set(Transaction.all);
  
      Form.handleChangedType();
    },
    reload() {
      DOM.clearTransactions();
      App.init();
    },
  };
  
  App.init();
  