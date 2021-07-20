window.onload = async function(){
    answer = await init();
    createElements();
    closeCard();
    cancelAll();
}

const buttonCancel = document.querySelector('.button_cancel');
const cardContainer = document.getElementById('container__cards');   
let buttonsClose;
let card;
let answer;

 
async function init(){
    const response = await fetch('http://contest.elecard.ru/frontend_data/catalog.json');
    let ret = await response.json();
    return ret;
};

function createElements(){
    for(let i=0; i<answer.length; i++){
        let element = document.createElement('div');
        element.classList.add('main-container_card');
        //element.innerHTML='Some text';
        cardContainer.append(element);
        let image = document.createElement('img');
        image.classList.add('pre-image');
        element.append(image);
        image.setAttribute('src', 'http://contest.elecard.ru/frontend_data/'+answer[i].image);
        let btnClose = document.createElement('button');
        btnClose.classList.add('button_close');
        element.append(btnClose);
        btnClose.innerHTML='X';
        buttonsClose = document.querySelectorAll('.button_close');
        card = document.querySelectorAll('.main-container_card')
        };   
};

function closeCard(){ 
    buttonsClose.forEach(function(item, i, buttonsClose){ 
        item.addEventListener('click', () => { 
            item.parentNode.style.display = 'none';
        }); //buttonsClose onclick
    }); //buttonsClose forEach
 };//closeCard

function cancelAll(){ 
    buttonCancel.addEventListener('click', () => {
        for(let i=0; i<card.length; i++){
            card[i].style.display = 'inline-block';
        }
    }); //buttonCancel onclick
};//cancelAll

/*let pic1 = {
    id:1,
    category:'city',
    url:'https://im0-tub-ru.yandex.net/i?id=d3ed0a1cbad3514adc0a10132d87cb3d&n=13',
    size:1};

let pic2 = {
    id:2,
    category:'animals',
    url:'https://i.ucrazy.ru/files/pics/2015.09/zhivotnmir14.jpg',
    size:2};

let pic3 = {
    id:3,
    category:'girl',
    url:'https://pbs.twimg.com/media/DabcLZcXcAA4Fuv.jpg',
    size:3};    

let pic4 = {
    id:4,
    category:'city',
    url:'https://im0-tub-ru.yandex.net/i?id=d3ed0a1cbad3514adc0a10132d87cb3d&n=13',
    size:4};
    
let pic5 = {
    id:5,
    category:'animals',
    url:'https://i.ucrazy.ru/files/pics/2015.09/zhivotnmir14.jpg',
    size:5};
    
let pic6 = {
    id:6,
    category:'girl',
    url:'https://pbs.twimg.com/media/DabcLZcXcAA4Fuv.jpg',
    size:6};   
    
let pic7 = {
    id:7,
    category:'city',
    url:'https://im0-tub-ru.yandex.net/i?id=d3ed0a1cbad3514adc0a10132d87cb3d&n=13',
    size:7};

let pic8 = {
    id:8,
    category:'animals',
    url:'https://i.ucrazy.ru/files/pics/2015.09/zhivotnmir14.jpg',
    size:8};

let pic9 = {
    id:9,
    category:'girl',
    url:'https://pbs.twimg.com/media/DabcLZcXcAA4Fuv.jpg',
    size:9};    

let pitures = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];*/

