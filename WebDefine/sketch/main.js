window.addEventListener('load', init);

function init() {
    let searchDiplay = document.querySelector('input');

    searchDiplay.addEventListener('keypress', setEnter);

    function setEnter(e) {
        if (e.keyCode == 13 || e.which == 13) {
            getWords(searchDiplay.value);
            // searchDiplay.value = '';
        }
    }

    function getWords(data) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data}`)
        .then(result => {
            return result.json();
        }).then(displayWords);
    }

    function displayWords(data) {
        console.log(data);
        let definition = data[0].meanings[0].definitions[0].definition;
        let synonyms;
        document.getElementById("results").innerHTML = 
        `
        <h3>Results for '${searchDiplay.value}'</h3>
        <span>${definition}</span>
        <br>
        <br>
        `
        searchDiplay.value = '';
        for (let x = 0; x < data[0].meanings[0].definitions[0].synonyms.length; x++) 
        {
            document.getElementById("results").innerHTML += 
            `
            
            <li>${data[0].meanings[0].definitions[0].synonyms[x]}</li>
            `
        }
    }
}