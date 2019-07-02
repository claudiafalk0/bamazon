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
        colWidths: [10,25,25,10,14]
       });
       for (i = 0; i < res.length; i++){
           displayTable.push(
               [res[i].id, res[i].name, res[i].department_name, res[i].price, res[i].quantity]
           );
       };
       console.log(displayTable.toString());
       divider;
       questions(res);

    });
};
function isValidID(product_id){
    var correctID;
    connection.query('SELECT id FROM items', function (err, res){
        if (err) throw err;
        for(i = 0; i < res.length; i++){
            if(res[i] === product_id){
                return correctID = true
            }
        }
    });
    return correctID = false;
};

// function getQuatity(id) {
//     return connection.query('SELECT * FROM items WHERE id = ?', [id], function(err, res) {
//         if (err) throw err;
//         return res[0].quantity;
//     });
// }

// function quantity(){
//     connection.query('SELECT quantity FROM items')
// }

function questions(){
    inquirer.prompt([
        {
            name: 'id_product',
            type: 'input',
            message: 'Please enter the id of the item you would like to purchase',
            validate: function(value){
                if(isNaN(value)){
                    console.log(`\n Please enter an item number\n\n`)
                }
                return true;

            }

        },
        {
            name:'how_many',
            message: 'Please enter the number of items you would like to purchase'

        }
    ]).then(function(answer){
        console.log('This should be false' + isValidID());
        console.log('This should be false' + !isValidID(answer.id_product));
        if(!isValidID(answer.id_product)) {
            console.log('I"m sorry, please choose a valid id');
            readTable();
        };
        // } else if(answer.how_many <= getQuatity(answer.id_product)) {
        //     console.log(`You have purchased ${how_many} ${id_product}`);
   
        // }
        //else {
        //     console.log('Insufficient quantity! Please enter a new amount.');
        // };

    });
};