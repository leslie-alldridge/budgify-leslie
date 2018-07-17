//immediately invoked function expression
//Budget controller
var budgetController = (function (){
    
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
        // get the field input data 
        var input = UICtrl.getInput();
        // add the item to the budget controller 
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