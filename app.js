//immediately invoked function expression
//Budget controller
var budgetController = (function (){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

// creating data structure
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //create new ID 
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            

            //create new item based on exp or inc 
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //push to array
            data.allItems[type].push(newItem);
            //return new element
            return newItem;

        },

        calculateBudget: function(){
            //calc total inc and exp
            calculateTotal('inc');
            calculateTotal('exp');
            //calc budget, inc - exp
            data.budget = data.totals.inc - data.totals.exp;
            //calc percentage or income we spent
            if (data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget, 
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
        }

    };

})();



//UI Controller
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            //create html string with placeholder text
        var html, newHtml, element;

        if (type === 'inc'){
            element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp'){
            element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        //replace placeholder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

            //insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr; 

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();



//Global app controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
        //event.which is there for old web browser support
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
};

var updateBudget = function() {
    //calc budget
    budgetCtrl.calculateBudget();
    //return budget
    var budget = budgetCtrl.getBudget();
    //display budget on UI
    console.log(budget);
};
    

var ctrlAddItem = function () {
    var input, newItem;
        // get the field input data 
        input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0){

        // add the item to the budget controller 
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // add item to the user interface 
        UICtrl.addListItem(newItem, input.type);
        //clear fields
        UICtrl.clearFields();
        // calculate budget
        updateBudget();
        //display budget on the UI

    } 
}

return {
    init: function(){
        console.log('Application has started.');
        setupEventListeners();
    }
};
    
})(budgetController, UIController);

controller.init();