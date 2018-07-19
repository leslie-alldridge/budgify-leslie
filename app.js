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
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
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

    

var ctrlAddItem = function () {
    var input, newItem;
        // get the field input data 
        input = UICtrl.getInput();
        // add the item to the budget controller 
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // add item to the user interface 
        // calculate budget
        //display budget on the UI
       
}

return {
    init: function(){
        console.log('Application has started.');
        setupEventListeners();
    }
};
    
})(budgetController, UIController);

controller.init();