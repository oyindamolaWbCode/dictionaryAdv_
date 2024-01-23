let toggle = document.querySelector('#toggle'); 
let body = document.querySelector('.body');
let li = document.querySelectorAll('li');
let searchInput = document.querySelector('input')
let search = document.querySelector('.fa-search')
let text = document.getElementById('text');
let phonetic = document.querySelector('.phonetic')
let lists = document.querySelector('.lists')
let Synonyms = document.querySelector('#Synonyms')
let verbList = document.querySelector('#verbList')
let sound = document.querySelector('.fa-play')
let line = document.querySelector('.line')
let wordHeadings = document.querySelectorAll('h2')


let toggler = false;
toggle.addEventListener('click', () => {
    toggler = !toggler
    if(toggle){
        toggle.classList.replace('fa-toggle-on', 'fa-toggle-off')
      body.style.backgroundColor = '#141414';  
    }else{
        toggle.classList.replace('fa-toggle-off', 'fa-toggle-on')
        body.style.backgroundColor = 'white'; 
          li.forEach(item => {
        item.style.color = 'black';
        line.style.backgroundColor = 'black'
        wordHeadings.style.color ='black'
    });
    }
    
  
}) 

// let input = searchInput.value;

// let dict_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`

// const generateWord = () =>{
//     fetch(dict_url)
//     .then(response => response.json())
//     .then(data => data)
// }

search.addEventListener('click', () =>{
    let input = searchInput.value;

    if(!input){
    alert('Input Required')
   

}else{

    let dict_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`

const generateWord = async () =>{
let result = ''
    try{
        const data = await fetch(dict_url)
        result = await data.json();
        console.log(result)

        if(result){
            text.textContent = result[0].word;
             phonetic.textContent = result[0].phonetics[1].text;

            const meaningList = result[0].meanings[0].definitions.map((meaning, index) => {
                return `
                <li>${meaning.definition}
                `
            }).join(' ')

            lists.innerHTML = meaningList;
        }

        Synonyms.innerHTML = `Synonyms: ${result[0].meanings[0].synonyms.join(',')}`

        const VerbList = result[0].meanings[1].definitions.map((meaning, index) => {
            return `
            <li>${meaning.definition}
            `
        }).join(' ')

        verbList.innerHTML = VerbList;
        
    }catch(error){
        console.log(error)
    }
}    
generateWord()

}// else{

// }
})

//sound play
let show = false;

sound.addEventListener('click', () =>{
    generateWord()
    const wordPlay = result[0].phonetics[0].audio
    sound.src = wordPlay;

  show = !show

    if(show){
        sound.classList.replace('fas fa-play', "fa-solid fa-pause")
    }else{
        sound.classList.replace('fa-solid fa-pause', "fas fa-play")
    }
})



