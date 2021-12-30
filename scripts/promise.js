document.addEventListener('DOMContentLoaded', () => {
    getButton = document.getElementById('fetchSpan');

    getButton.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            document.fetchForm.button.click();
        }
    })
});


function errFunction(err) {
    document.getElementById('preloader').src = '../images/preloaders/err.png';
    // document.getElementById('fetchSpan').classList.toggle('hidden');
    alert(err);
}


function getData() {
    // document.getElementById('fetchSpan').classList.toggle('hidden');
    document.getElementById('preloader').src = '../images/preloaders/loader.webp';
    document.getElementById('preloader').style.display = "block";

    setTimeout(fetchRequest, 3000); // для того, чтобы прелоадер немного поработал

    function fetchRequest() {
        let url = String('https://jsonplaceholder.typicode.com/') + fetchForm.dataSelector.value;
        
        fetch(url) // , {id: '1'})
            .then((response) => {
                if (response.ok) {
                    document.getElementById('preloader').style.display = "none";
                    return response.json();
                } else 
                    throw new Error(response.status);
            })
            .then((data) => {
                let div = document.getElementById('fetchDiv');
                let output = '';

                function getValues(obj, keys) {
                    let result = '';

                    for (key of keys) {
                        if (typeof(obj[key]) == 'object') {
                            result += key + ":" + "<pre>" + getValues(obj[key], Object.keys(obj[key])) + "</pre>";
                            continue;
                        } else 
                            result += `<p>${key}: ${obj[key]}</p>`;
                    }
                    return result;
                }

                for (obj of data) {
                    output += '<div style=\"background-color:azure;margin:3%;width:min-content;border:solid black;padding:5px;\">';
                    keys = Object.keys(obj);

                    output += getValues(obj, keys) + '</div><br>';
                }

                div.innerHTML = output;
                div.style="display:block;";
            })
            .catch(errFunction)
    }
}