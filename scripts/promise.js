document.addEventListener('DOMContentLoaded', () => {
    getButton = document.getElementById('fetchSpan');

    getButton.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            document.fetchForm.button.click();
        }
    })
});

let tmp = null;

function getData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (response.ok) 
                return response.json();
            else 
                throw new Error(response.status)
        })
        .then((data) => {
            let div = document.getElementById('fetchDiv');
            let output = '';

            tmp = data;

            for (obj in data) {
                output += '<div style=\"background-color:azure;margin:3%;width:min-content;\">';
                keys = Object.keys(obj);
                for (key in keys)
                    output += `<p>${key}: ${data[key]}</p>`
                output += '</div><br>';
            }

            div.innerHTML = output;
            div.style="display:block;";
        })
        .catch(alert)
}