let  dailyExpenseschoose = document.getElementsByClassName('choose-expenses'),
    dailyExpenses = document.getElementsByClassName('expenses-item'),
    dailyExpensesBtn = document.getElementsByClassName('expenses-item-btn')[0],
    
    optionalExpenses = document.getElementsByClassName('optionalexpenses'),
    oeItem = document.getElementsByClassName('optionalexpenses-item'),
    oeBtn = document.getElementsByTagName('button')[1],
    
    countBudget = document.getElementsByClassName('count-budget'),
    countBudgetBtn = document.getElementsByTagName('button')[2],
    chooseIncome = document.getElementById('income'),
    checkSavings = document.getElementsByClassName('checksavings'),
    savings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    
    btnStart = document.querySelector('.start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optExpValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSaveValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSaveValue = document.getElementsByClassName('yearsavings-value')[0],

    yearValue = document.querySelector('.year-value'),
    dayValue = document.querySelector('.day-value'),
    monthValue = document.querySelector('.month-value');


let money , time ;

oeBtn.disabled = true;
countBudgetBtn.disabled = true;
dailyExpensesBtn.disabled = true;

btnStart.addEventListener('click', function(){
    time = prompt('Введите дату в формате YYYY-MM-DD' , '');
    money = +prompt("Ваш бюджет на месяц ?" , '');

    while(isNaN(money) || money == '' || money == null ) {
        money = +prompt("Ваш бюджет на месяц ?" , '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    oeBtn.disabled = false;
    countBudgetBtn.disabled = false;
    dailyExpensesBtn.disabled = false;
});

dailyExpensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < dailyExpenses.length; i++){
        let a = dailyExpenses[i].value,
            b = dailyExpenses[++i].value;
        
        if ((typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
    } else {
        i--;
    }
    expensesValue.textContent = sum;
    }
});

oeBtn.addEventListener('click', function(){
    for (let i = 0; i < oeItem.length; i++) {
        let opt = oeItem[i].value;
        appData.optionalExpenses[i]= opt;
        optExpValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function(){
    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay <  1000){
                levelValue.textContent ="Minimum level of wealth";
            } else if (appData.moneyPerDay > 1000 && appData.moneyPerDay < 5000){
                levelValue.textContent ="Middle level of wealth!";
            } else if (appData.moneyPerDay > 5000 && appData.moneyPerDay < 100000){
                levelValue.textContent ="High level of wealth!!!";
            } else {
                levelValue.textContent ="It's very small sum! Really!";
            }
    } else {
        dayBudgetValue.textContent = 'Error!?';
    }
});

chooseIncome.addEventListener('change', function(){
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

savings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSaveValue.textContent = appData.monthIncome;
        yearSaveValue.textContent = appData.yearIncome;
    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSaveValue.textContent = appData.monthIncome.toFixed(1);
        yearSaveValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget : money ,
    expenses : {} ,
    optionalExpenses : {} ,
    income : [] ,
    timeData : time ,
    savings : false 
};










