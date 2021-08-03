window.onload = async function(){
    loader('show')
    answer = await init();
    chooseView();
    searchCategory();
    sorting();
    if(localStorage.getItem('closedCards') !== null){
        closedCards = JSON.parse(localStorage.getItem ("closedCards"));
    };
    createElements();
    createTreeElements();  
    loader('hide')  
    layoutTree();
    cancelAll();
    openThumbnail();
}

const buttonCancel = document.querySelector('.button_cancel');
const cardContainer = document.getElementById('container__cards');  
const treeContainer = document.getElementById('container__tree');  
let card;
let answer;
let url = 'http://contest.elecard.ru/frontend_data/';
let thumbnails;
let pagination = document.querySelector('.pagination');
let pageLinks = [];
let isActiveBtn;
let sortBtns = document.querySelectorAll('input[name="sort"]');
let element;
let closedCards = [];

async function init(){
    const response = await fetch(url+'catalog.json'); 
    let ret = await response.json();  
    return ret;
};

function timestampToDate(ts) {
    let d = new Date();
    d.setTime(ts);
    return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
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
    return arrCategory;
}

function createElements(){
    let elements = Array.from(answer);
    let elemOnPage = 9;
    $(function() {
        $('.pagination').pagination({
            items: elements.length,
            itemsOnPage: elemOnPage,
            cssStyle: 'light-theme'
        });
    });
    
    let pageLinks = pagination.getElementsByTagName('li');
    showPage(pageLinks[1]);
    
    function showPage(pageLink){
        let pageNumber = +pageLink.innerText;
        let start = (pageNumber-1)*elemOnPage;
        let end = start+elemOnPage;
        let l=start;
        let activEls = elements.slice(start, end);
        cardContainer.innerHTML = '';
      
        for(let activEl of activEls){
            element = document.createElement('div');
            element.classList.add('main-container_card');
            cardContainer.append(element);
            let image = document.createElement('img');
            image.classList.add('pre-image');
            element.append(image);
            image.setAttribute('src', url+answer[l].image);
            for(let j=0; j<closedCards.length; j++){
                if(closedCards[j]===url+answer[l].image){
                    element.style.display = 'none';
                }
            }
            let content = document.createElement('div');
            let date = timestampToDate(answer[l].timestamp);
            content.innerHTML=answer[l].category+'<p>'+date;
            content.classList.add('card_content');
            element.append(content);
            let btnClose = document.createElement('button');
            btnClose.classList.add('button_close');
            element.append(btnClose);
            btnClose.innerHTML='X';
            closeCard(btnClose);
            card = document.querySelectorAll('.main-container_card');
            l++;
        }; //elements of this page 
        
        pageLinks = document.querySelectorAll('.page-link');
        for (let pageLink of pageLinks){
            pageLink.addEventListener('click', function() {
                showPage(this); 
            });
        }

    };// showPage 
};//createElements

function loader(isShow){
    let loader = document.getElementById('loading');
    if(isShow === 'show'){
        loader.style.display='block';
    };
    if(isShow === 'hide'){
        loader.style.display='none';
    }    
} 

function closeCard(item){
    item.addEventListener('click', () => { 
        item.parentNode.style.display = 'none';
        let parent = item.parentNode; 
        let closeCard = parent.querySelector('.pre-image'); 
        let closeCardAttribute = closeCard.getAttribute('src');
        closedCards.push(closeCardAttribute);
        localStorage.setItem("closedCards", JSON.stringify(closedCards));
    }); 
}

function cancelAll(){ 
    buttonCancel.addEventListener('click', () => {
        for(let i=0; i<card.length; i++){
            card[i].style.display = 'inline-block';
            localStorage.clear();
            closedCards = [];
        }
    }); 
};

let toggler = document.getElementsByClassName('caret');

function layoutTree(){
    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function() {
            this.parentElement.querySelector('.nested').classList.toggle('active');
            this.classList.toggle('caret-down');
        });
    };
}

function createTreeElements(){
    let ul = document.createElement('ul');
    ul.classList.add('nested');
    treeContainer.append(ul);
    
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
            let imgList = document.createElement('span');
            secondUl.append(imgList);
            let imageInTree = document.createElement('img');
            imageInTree.classList.add('thumbnail');
            let attribute = Object.values(arrCategory)[i][j];
            imageInTree.setAttribute('src', url+attribute);
            imgList.append(imageInTree);
            thumbnails = document.querySelectorAll('.thumbnail');
        }
    }
}

function openThumbnail(){
    thumbnails.forEach(function(item, i, thumbnails){ 
        item.addEventListener('click', () => { 
            item.classList.toggle('bigPicture')
        }); 
    }); 
}

function chooseView(){
let radios = document.querySelectorAll('input[name="view"]');

    for(let radio of radios){
        radio.addEventListener('click', function() {
            if(radio.value==='cards'){
                document.querySelector('.tree').classList.add('notView');
                document.querySelector('#container__cards').classList.remove('notView');
                pagination.classList.remove('notView');
                buttonCancel.classList.remove('notView');
            } else {
                document.querySelector('#container__cards').classList.add('notView');
                document.querySelector('.tree').classList.remove('notView');
                pagination.classList.add('notView');
                buttonCancel.classList.add('notView');
            }
        });
    }
}

function sorting(){
    for (let sortBtn of sortBtns){
        sortBtn.addEventListener('click', function() {
            function compare(a, b) {
                const elemA = a[sortBtn.value];
                const elemB = b[sortBtn.value];
                  
                let comparison = 0;
                if (elemA > elemB) {
                    comparison = 1;
                } else if (elemA < elemB) {
                    comparison = -1;
                    }
                return comparison;
            }  
                answer.sort(compare);
                pagination.innerHTML = '';
                createElements();
        })
    }
}