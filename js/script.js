const incomeInput = document.querySelector('#income-section input');
const addExpenseBtn = document.getElementById('add-expense');
const expenseItemsContainer = document.getElementById('expense-items');
const calculateBtn = document.getElementById('calculate');
const balanceText = document.getElementById('balance-text');
const ctx = document.getElementById('expenses-chart').getContext('2d');

let expenses = [];

function createExpenseItem() {
   const div = document.createElement('div');
   div.className = 'expense-item';

   // Название расхода
   const nameInput = document.createElement('input');
   nameInput.type = 'text';
   nameInput.placeholder = 'Название расхода';

   // Сумма расхода
   const amountInput = document.createElement('input');
   amountInput.type = 'number';
   amountInput.placeholder = 'Сумма расхода';
   amountInput.value = 0;

   // Кнопка удаления
   const removeBtn = document.createElement('button');
   removeBtn.textContent = 'Удалить';
   removeBtn.addEventListener('click', () => {
      expenseItemsContainer.removeChild(div);
      expenses = expenses.filter(e => e !== amountInput);
      updateChart();
   });

   div.appendChild(nameInput);
   div.appendChild(amountInput);
   div.appendChild(removeBtn);
   expenseItemsContainer.appendChild(div);

   expenses.push(amountInput);
}

addExpenseBtn.addEventListener('click', createExpenseItem);

let chart;

function updateChart() {
   const labels = Array.from(expenseItemsContainer.querySelectorAll('input[type="text"]'))
      .map(input => input.value || 'Расход');
   const data = expenses.map(input => parseFloat(input.value) || 0);

   if (chart) chart.destroy();

   chart = new Chart(ctx, {
      type: 'pie',
      data: {
         labels: labels,
         datasets: [{
            data: data,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'],
         }]
      }
   });
}

calculateBtn.addEventListener('click', () => {
   const income = parseFloat(incomeInput.value) || 0;
   const totalExpenses = expenses.reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
   const balance = income - totalExpenses;
   balanceText.textContent = `Баланс: ${balance} ₽`;
   updateChart();
});
