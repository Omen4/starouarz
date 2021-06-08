let iCarrousel = 0; 
let carrousel = ['./img/Coruscant.png', './img/Naboo.jpg', './img/Tatooine.jpg' ];
let charactersList = [];
let url = 'https://swapi.dev/api/people/';
let characterData = '';
let isPrevioused = false ;
let isTimedIgnored = false;  

function renderCarrousel(){
    let imgAffichee = $('#carrousel img');
    let createImg = $('<img>',{src:carrousel[iCarrousel], style:'display: none'}); 
    if (!isPrevioused){
        createImg.fadeIn(1000, function(){
            imgAffichee.remove();
        });
    }
    else{
        createImg.fadeIn(0, function(){
        }); 
        console.log(isPrevioused == true);
        isPrevioused = false;
    }
    $('#carrousel').append(createImg); 
}

function onPreviousCarrousel(){
    if (iCarrousel == 0){
        iCarrousel = carrousel.length;
    }
    iCarrousel = (--iCarrousel)%carrousel.length;
    isPrevioused = true;
    isTimedIgnored = true;
    renderCarrousel();
}

function onNextCarrousel(){
    if (iCarrousel == 0){
        iCarrousel = carrousel.length;
    }
    iCarrousel = (++iCarrousel)%carrousel.length;
    isPrevioused = true;
    isTimedIgnored = true;
    renderCarrousel();
}
//stopper le timer, ca doit'juste'sauter un timer.


function renderSelector(){
    //affiche la liste 
    for (let i = 0; i < charactersList.length; i++) {
        let option = $('<option>',{value: charactersList[i].key}).append(charactersList[i].name);
        $('#characterSelect').append(option);
        //console.log(option);
    }
}

function renderChar(){
    //affiche la character sheet
    let createPerso = $('<div>',{});
    let characterSheet = '<br>NAME: '+ characterData.name+'<br>'
    +'HEIGHT: '+ characterData.height+'cm <br>'
    +'MASS: '+ characterData.mass+'kg <br>'
    +'HAIR COLOR: '+ characterData.hair_color+'<br>'
    +'SKIN COLOR: '+ characterData.skin_color+'<br>'
    +'EYE COLOR: '+ characterData.eye_color+'<br>'
    +'BIRTH YEAR: '+ characterData.birth_year+'<br>'
    +'GENDER: '+ characterData.gender+'<br>';
    createPerso.append(characterSheet);
    $('#scroller').append(createPerso);
    $('#characterSelect').prop( 'disabled', true );
    setTimeout(function(){
        $('#characterSelect').prop( 'disabled', false );
    }, 15000);
}


function onLoad(){ 
    $.get(url, function(data){
        charactersList = [];
        let listLength = data.results.length;
        let results = data.results;
        for (let i = 0; i < listLength ; i++) {
            let personnage = {name: results[i].name, key: i+1};
            charactersList.push(personnage);
        }
        renderSelector();
    });
    onTimeout();
    renderCarrousel();
}

function onSelectChar(selectedChar){
    console.log(selectedChar);
    $.get(url+selectedChar, function(data){
        characterData = data;
        renderChar();
    });
    let audio = $('audio')[0];
    audio.play();   
    
}

function onTimeout(){
    let actionOnTimeout = function(){
        if (!isTimedIgnored){
            iCarrousel = (++iCarrousel)%carrousel.length;
            renderCarrousel();
        }
        onTimeout();
        isTimedIgnored = false; 
    };
    setTimeout(actionOnTimeout, 2000);  
}