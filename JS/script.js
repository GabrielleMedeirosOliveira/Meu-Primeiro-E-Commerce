let cartDataBase = [];
const actualData = [];

function createPost(arrayPosts){
    const list = document.querySelector('.list_product');
    let item = '';

    for(let i = 0; i < arrayPosts.length; i++) {
        let arrayTags = arrayPosts[i].tags; 

        item += `
            <li class="product"> 
                <img src="${arrayPosts[i].img}" alt="${arrayPosts[i].titulo}">
                <div class="descritive">
                    <div class="div-tag">
                        ${createTags(arrayTags)}
                    </div>
                    <h2>${arrayPosts[i].titulo}</h2>
                    <p class="descrition">${arrayPosts[i].descricao}</p>
                    <span class="value"> R$ ${arrayPosts[i].valor}</span>
                    <button type="button" class="button-add-cart" id="addToCart${arrayPosts[i].id}" data-id="${arrayPosts[i].id}" onclick="addToCart(this)">Adicionar ao carrinho</button>
                </div>
            </li>
        `;
    }

    list.innerHTML = item;
}

function createTags(arrayTags = []) {
    let tagsElement = '';
    for(let j=0; j< arrayTags.length;j++){ 
        tagsElement += `
            <span class="tag">${arrayTags[j]}</span>
        `;
    };
    return tagsElement;
}

function createCart() {
    const list = document.querySelector('.list-cart');
    
    let cart = '';

    for( let i = 0; i < cartDataBase.length; i++){
        cart += `
            <li class="product-cart"> 
                <img id="img-cart" src="${cartDataBase[i].img}" alt="${cartDataBase[i].titulo}">
                <div class="descritive-cart">
                    <h2>${cartDataBase[i].titulo}</h2>
                    <p class="value-cart">R$ ${cartDataBase[i].valor}</p>
                    <button type="button" class="button-remove-cart" id="removeToCart${cartDataBase[i].id}" data-id="${cartDataBase[i].id}" onclick="removeToCart(this)">Remover do carrinho</button>
                </div>
            </li>
         `;
    }
     
    list.innerHTML = cart;
}

function addToCart(product){
    const itemSelected = dataBase.filter((item) => item.id === product.getAttribute("data-id"))[0];
    cartDataBase.push(itemSelected);
    createCart();
    quantityCard();
    valueCard();
}

function removeToCart(product){
    const itemsfiltered = cartDataBase.filter((item) => item.id !== product.getAttribute("data-id"));
    cartDataBase = itemsfiltered;
    createCart();
    quantityCard();
    valueCard();
}

document.addEventListener("DOMContentLoaded", function(event) {
    createPost(dataBase);
});

const listItem = document.getElementById('listNav');
listItem.addEventListener('click', filterPosts);

function filterPosts(event){
    const newData = [];
    const item = event.target;
    const arrayItens = document.querySelectorAll('.item-nav');

    if(item.dataset.tag === 'Todos'){
        createPost(dataBase);
    } else {
        for( let i = 0; i< dataBase.length; i++){
            if(dataBase[i].tags.indexOf(item.dataset.tag) !== -1){
                newData.push(dataBase[i]);
            }
        }
        createPost(newData);
    }

    for(let i = 0; i < arrayItens.length; i++){
        arrayItens[i].classList.remove('active');
    } 
    item.classList.add('active');
}

const buttonBuscar = document.getElementById('btnFind');
buttonBuscar.addEventListener('click', findPost);

function findPost(){
    const inputValue = document.getElementById('inputFind');
    const newData = [];
    for ( let i = 0; i < dataBase.length; i++){
        console.log(inputValue);
        if(dataBase[i].titulo.indexOf(inputValue.value) !== -1){
            newData.push(dataBase[i]);
        }
    }
    createPost(newData);
}

function quantityCard (){
    let stringQuantity = document.getElementById('quantity-number');
    stringQuantity.innerHTML = cartDataBase.length;
}

function valueCard () {
    let stringValue =  document.getElementById('value-number');
    let valueatt = 0;

    for(let i = 0; i < cartDataBase.length ; i++){
        valueatt += cartDataBase[i].valor;
    }
    stringValue.innerHTML = `R$ ${valueatt}`;
}