let toggle = document.querySelector("#toggle");
let body = document.querySelector(".body");
let li = document.querySelectorAll("li");
let line = document.querySelectorAll(".line");
let searchInput = document.querySelector("input");
let search = document.querySelector(".fa-search");
let text = document.getElementById("text");
let phonetic = document.querySelector(".phonetic");
let lists = document.querySelector(".lists");
let Synonyms = document.querySelector("#Synonyms");
let verbList = document.querySelector("#verbList");
let sound = document.querySelector(".fa-play");
let wordHeadings = document.querySelectorAll("h2");

let toggler = false;

toggle.addEventListener("click", () => {
  toggler = !toggler;

  if (toggler) {
    toggle.classList.replace("fa-toggle-on", "fa-toggle-off");

    body.style.backgroundColor = "#141414";

    li.forEach((item) => {
      item.style.color = "white";
    });

    line.forEach((linny) => {
      linny.style.borderBottomWidth = "2px";
      linny.style.borderBottomStyle = "solid";
      linny.style.borderBottomColor = "white";
    });

    wordHeadings.forEach((headings) => {
      headings.style.color = "white";
    });
  } else {
    toggle.classList.replace("fa-toggle-off", "fa-toggle-on");

    body.style.backgroundColor = "white";

    li.forEach((item) => {
      item.style.color = "black";
    });

    line.forEach((linny) => {
      linny.style.borderBottomWidth = "2px";
      linny.style.borderBottomStyle = "solid";
      linny.style.borderBottomColor = "black";
    });

    wordHeadings.forEach((headings) => {
      headings.style.color = "black";
    });
  }
});

// let input = searchInput.value;

// let dict_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`

// const generateWord = () =>{
//     fetch(dict_url)
//     .then(response => response.json())
//     .then(data => data)
// }

search.addEventListener("click", () => {
  let input = searchInput.value;

  if (!input) {
    alert("Input Required");
  } else {
    let dict_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

    const generateWord = async () => {
      let result = "";
      try {
        const data = await fetch(dict_url);
        result = await data.json();
        console.log(result);

        if (result) {
          text.textContent = result[0].word;
          phonetic.textContent = result[0].phonetics[1].text;

          const meaningList = result[0].meanings[0].definitions
            .map((meaning, index) => {
              return `
                <li>${meaning.definition}
                `;
            })
            .join(" ");

          lists.innerHTML = meaningList;

          Synonyms.innerHTML = `Synonyms: ${result[0].meanings[0].synonyms.join(
            ","
          )}`;

          const VerbList = result[0].meanings[1].definitions
            .map((meaning, index) => {
              return `
            <li>${meaning.definition}
            `;
            })
            .join(" ");

          verbList.innerHTML = VerbList;

          // const wordPlay = result[0].phonetics.audio;
       
          const hasPlay = result[0].phonetics.find((sound)=> sound.audio !== '')

          if (hasPlay) {
            let aud = document.getElementById("aud");
            aud.src = hasPlay.audio;

            sound.addEventListener("click", () => {
              aud.play();
            });
          } else {
            aud.src = ''
          }

        } else {
          text.textContent = "Word not found";
          phonetic.textContent = "";
          verbList.innerHTML = "";
          lists.innerHTML = "";
        }
      } catch (error) {
        console.log(error);
      }
    };
    generateWord();
  }
});


