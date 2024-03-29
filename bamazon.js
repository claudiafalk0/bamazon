var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('cli-table');
var divider = '\n---------------------\n\n'
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user:'root',
    password: 'root',
    database: 'bamazon_DB'
});

connection.connect(function(err){
    if (err) throw err;
    readTable();
});
function readTable(){

    connection.query('SELECT * FROM items', function(err, res){
        if (err) throw err;
       var displayTable = new table({
        head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
        colWidths: [10,25,25,12,14]
       });
       for (i = 0; i < res.length; i++){
           displayTable.push(
               [res[i].id, res[i].name, res[i].department_name, '$' + res[i].price.toFixed(2), res[i].quantity]
           );
       };
       console.log(displayTable.toString());
       divider;
       questions(res);

    });
};
function updateItemQuantity(obj, num){
        if(num <= obj.quantity){
            var newNum = obj.quantity - parseInt(num);
            connection.query('UPDATE items SET ? WHERE ?',
            [
                {
                    quantity: newNum
                },
                {
                    id: obj.id
                }
            ],
            function(err){
                if(err) throw err;
                return;
            }
            )
            console.log(`You have purchased ${num} items. Your total cost is $${(num * obj.price).toFixed(2)}`);
            readTable();
        }else{
            console.log('Insufficient quantity!');
            readTable();
        }
}

function questions(){
    inquirer.prompt([
        {
            name: 'id_product',
            type: 'input',
            message: 'Please enter the id of the item you would like to purchase\n',
            validate: function(value){
                if(isNaN(value)){
                    console.log(`\n Please enter an item number\n\n`)
                }
                return true;
            }
        },
        {
            name:'how_many',
            message: 'Please enter the number of items you would like to purchase\n'
        }
    ]).then(function(answer){
        connection.query('SELECT * FROM items', function(err, res){
            if(err) throw err;
            for(var i = 0; i < res.length; i++) {
                if(res[i].id === parseInt(answer.id_product)){
                    return updateItemQuantity(res[i], answer.how_many);
                };
            };
            console.log('I"m sorry, please choose a valid id');
            readTable()
        });
        // readTable();
    });

};