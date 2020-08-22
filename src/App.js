import React, { Component } from "react";
import { render } from "react-dom";
import $ from "jquery"
import logo from './logo.svg';
import './App.css';

var myArray = [
]

var data = myArray;

function searchTable(value, data){
    var filteredData = []

    for (var i = 0; i < data.length; i++){
        value = value.toLowerCase()
        const name = data[i].product_name.toLowerCase()

        if (name.includes(value)){
            filteredData.push(data[i])
        }
    }
    return filteredData
}

function buildTable(data){
    var table = document.getElementById('myTable')
    table.innerHTML = ''
    for (var i = 0; i < data.length; i++){
        var colname = `product_name-${i}`
        var colage = `unit_cost-${i}`
        var row = `<tr>
                        <td class="name" data-index="${i}">${data[i].product_name}</td>
                        <td>${data[i].unit_cost}</td>
                   </tr>`
        table.innerHTML += row
    }
    $('.name').on('click', function(){
      var index = $(this).data('index')
      alert("Product Info\n-------------\n" + "Name : "+data[index].product_name
          + "\nPrice : "+data[index].unit_cost
          + "\nSupplier : "+data[index].supplier
          + "\nQuantity : "+data[index].quantity)
        var button = document.querySelector('#last_product')
        button.dataset.index = index
        console.log(index)
        console.log(button.dataset.index)
        $('#last_product').unbind('click');
        $('#last_product').on('click', function(){
            alert("Product Info\n-------------\n" + "Name : "+data[index].product_name
                + "\nPrice : "+data[index].unit_cost
                + "\nSupplier : "+data[index].supplier
                + "\nQuantity : "+data[index].quantity)
        })
    })
}

class App extends Component {
    async componentDidMount() {
       await fetch ("http://localhost:3000/dataset-example.json")
        .then(res => res.json())
        .then(res => myArray = res)
        data = myArray
        buildTable(myArray);

        $('.product_name').on('click', function(){
            var column = $(this).data('colname')
            var order = $(this).data('order')
            var text = $(this).html()
            text = text.substring(0, text.length - 1);

            if (order == 'decroissant'){
                data = data.sort((a, b) => a[column] > b[column] ? 1 : -1)
                $(this).data("order","croissant");
                text += '&#9660'
            }else{
                data = data.sort((a, b) => a[column] < b[column] ? 1 : -1)
                $(this).data("order","decroissant");
                text += '&#9650'
            }

            $(this).html(text)
            buildTable(data)
        });

        $('.unit_cost').on('click', function(){
            var column = $(this).data('colname')
            var order = $(this).data('order')
            var text = $(this).html()
            text = text.substring(0, text.length - 1);

            if (order == 'decroissant'){
                data = data.sort((a, b) => parseInt(a[column].slice(1)) > parseInt(b[column].slice(1)) ? 1 : -1)
                $(this).data("order","croissant");
                text += '&#9660'
            }else{
                data = data.sort((a, b) => parseInt(a[column].slice(1)) < parseInt(b[column].slice(1)) ? 1 : -1)
                $(this).data("order","decroissant");
                text += '&#9650'
            }

            $(this).html(text)
            buildTable(data)
        });

        $('#search-input').on('keyup', function(){
            var value = $(this).val()
            data = searchTable(value, myArray)
            buildTable(data)
        })
    }
    render() {
        return (
            <div className="App">
            </div>
        );
    }
}

render(<App />, document.getElementById("root"));
export default "App";
