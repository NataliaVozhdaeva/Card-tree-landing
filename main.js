window.onload = async function(){
    answer = await init();
    chooseView();
    searchCategory();
    createElements();
    createTreeElements();   
    layoutTree();
    closeCard();
    cancelAll()
}

const buttonCancel = document.querySelector('.button_cancel');
const cardContainer = document.getElementById('container__cards');  
const treeContainer = document.getElementById('container__tree');  
let buttonsClose;
let card;
let answer;
let url = 'http://contest.elecard.ru/frontend_data/';

 
async function init(){
    const response = await fetch(url+'catalog.json');
    let ret = await response.json();
    return ret;
};

function timestampToDate(ts) {
    let d = new Date();
    d.setTime(ts);
    return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}

function createElements(){
    for(let i=0; i<answer.length; i++){
        let element = document.createElement('div');
        element.classList.add('main-container_card');
        cardContainer.append(element);
        let image = document.createElement('img');
        image.classList.add('pre-image');
        element.append(image);
        image.setAttribute('src', url+answer[i].image);
        let content = document.createElement('div');
        let date = timestampToDate(answer[i].timestamp);
        content.innerHTML=answer[i].category+'<p>'+date;
        content.classList.add('card_content');
        element.append(content);
        let btnClose = document.createElement('button');
        btnClose.classList.add('button_close');
        element.append(btnClose);
        btnClose.innerHTML='X';
        buttonsClose = document.querySelectorAll('.button_close');
        card = document.querySelectorAll('.main-container_card')
        };   
};

let arrCategory = {};

function searchCategory(){
    
    for(let i=0; i<answer.length; i++){
        if(answer[i].category in arrCategory){
            arrCategory[answer[i].category].push(answer[i].image);
        } else {
            arrCategory[answer[i].category] = [answer[i].image];
        }
    }
   // console.log(Object.values(arrCategory));
    return arrCategory;
}
//console.log(Object.keys(arrCategory));
//console.log(arrCategory);


function createTreeElements(){
    let ul = document.createElement('ul');
    ul.classList.add('nested');
    treeContainer.append(ul);
    
    //arrCategory.keys(arrCategory);

    for(let i=0; i<Object.keys(arrCategory).length; i++){
      let categoryList = document.createElement('li');
      ul.append(categoryList);
      let categorySpan = document.createElement('span');
      categorySpan.classList.add('caret');
      categoryList.append(categorySpan)
      categorySpan.textContent = String(Object.keys(arrCategory)[i]);
      let secondUl = document.createElement('ul');
      secondUl.classList.add('nested');
      categoryList.append(secondUl);

        for(let j=0; j<Object.values(arrCategory)[i].length; j++){
            let imgList = document.createElement('li');
            secondUl.append(imgList);
            let imageInTree = document.createElement('img');
            imageInTree.classList.add('thumbnail');
            let attribute = Object.values(arrCategory)[i][j];
            //console.log('Переменная атрибут = '+attribute);
            imageInTree.setAttribute('src', url+attribute);
            imgList.append(imageInTree);
        }
    }
}

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

let toggler = document.getElementsByClassName('caret');

function layoutTree(){
for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener('click', function() {
    this.parentElement.querySelector('.nested').classList.toggle('active');
    this.classList.toggle('caret-down');
  });
};
}

function chooseView(){
let radios = document.querySelectorAll('input[type="radio"]');

for(let radio of radios){
    radio.addEventListener('click', function() {
        if(radio.value==='cards'){
            document.querySelector('.tree').classList.add('notView');
            document.querySelector('#container__cards').classList.remove('notView');
        } else {
            document.querySelector('#container__cards').classList.add('notView');
            document.querySelector('.tree').classList.remove('notView');
        }
    });
}
}

