import config from './config.js';

const API_KEY = config.API_KEY;
const categoriesURL = 'https://famous-quotes4.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY,
		'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com'
	}
};

fetch(categoriesURL, options)
.then(response => response.json())
.then(data => data.forEach(category => {
    const categoryMarkup = `<option value="${category}">${category}</option>`

    document.getElementById("categories").insertAdjacentHTML("beforeend", categoryMarkup);
}))
.catch(error => console.log("error: ", error));

//change selected value
const number = document.getElementById("number");
let numVal = 1;

number.addEventListener('onfocus', function () {
    number.value = "";
});

number.addEventListener("mouseout", function () {
    if (this.value > 10) {
        this.value = 10;
    } else if (this.value <= 0) {
        this.value = 1;
    }
    numVal = this.value;
});

const categories = document.getElementById('categories');
let selectedCategory = "";
categories.addEventListener("input", handleSelect );

function handleSelect(ev) {
    let select = ev.target;
    selectedCategory = select.value;
}
  
const button = document.getElementById('button');
button.addEventListener('click', function() {
    document.getElementById('quotes-container').innerHTML = "";
    let quotesURL = `https://famous-quotes4.p.rapidapi.com/random?category=${selectedCategory}&count=${numVal}`;

    fetch(quotesURL, options)
    .then(response => response.json())
    .then(data => data.forEach(quote => {
        let text = quote.text;
        let author = quote.author;
        let category = quote.category;
        const markup = `<div class='card'><p class='quote'>"${text}"</p><p class='author'>-${author}</p><p class='category'>Category: ${category}</p><div>`;
        document.getElementById('quotes-container').insertAdjacentHTML("beforeend", markup);
        })
    )
    .catch(error => console.log('error: ', error));
})