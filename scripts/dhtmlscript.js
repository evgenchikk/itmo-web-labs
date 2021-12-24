let tabIndex = 4;


document.addEventListener('DOMContentLoaded', () => {
    submitButton = document.getElementById('submit');
    loadButton = document.getElementById('load');

    submitButton.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            document.tableParams.createButton.click();
        }
    })
    
    loadButton.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            document.tableParams.loadButton.click();
        }
    })
});


function getParams() {
    rowsCount = document.tableParams.rowsCount.value;
    colsCount = document.tableParams.colsCount.value;

    if (rowsCount <= 0 || colsCount <= 0 || !Number.isInteger(parseInt(rowsCount)) || !Number.isInteger(parseInt(colsCount))) 
        alert('Wrong format');
    else 
        createTable(rowsCount, colsCount);
}


function createTable(rowsCount, colsCount) {
    document.getElementById('saveDiv').style = "display:none;";
    document.getElementById('textSubmit').style = "display:block;";

    tableText = "";

    let template = document.getElementById('templateColumn');

    for (i = 0; i < rowsCount; i++) {
        tableText += "<tr>";
        for (j = 0; j < colsCount; j++) {
            tableText += template.innerHTML;
        }
        tableText += "</tr>";
    }

    tableBody = document.getElementById('dTableBody');
    tableBody.innerHTML = tableText;

    document.getElementById('dTable').style.height = 10 * rowsCount + "vh";
    document.getElementById('dTable').style.width = 10 * colsCount + "vw";

    document.getElementById('dhtml-section').classList.remove('hidden');


    document.querySelectorAll('textarea').forEach(function (el) { 
        el.tabIndex = tabIndex++;
    })

    document.getElementById('textSubmit').tabIndex = tabIndex++;
    document.getElementById('textSubmit').addEventListener('keydown', (e) => {
        if (e.key == 'Enter') 
            document.tableContent.drawButton.click();
    })
}


function getText() {
    document.getElementById('textSubmit').style = "display:none;";

    allTextNodeList = document.getElementsByName('tableTextarea');
    allText = [];

    for (i = 0; i < allTextNodeList.length; i++) 
        allText.push(allTextNodeList[i].value);

    drawTable(rowsCount, colsCount, allText);
}


function drawTable(rowsCount, colsCount, data) {
    document.getElementById('dTableBody').innerHTML = "";

    tableText = "";
    for (i = 0; i < rowsCount; i++) {
        tableText += "<tr>";
        for (j = 0; j < colsCount; j++) 
            tableText += "<td style=\"text-align:center!important;\">" + data[i * colsCount + j] + "</td>";
        
        tableText += "</tr>";
    }

    tableBody = document.getElementById('dTableBody');
    tableBody.innerHTML = tableText 

    document.getElementById('dTable').style.height = 10 * rowsCount + "vh";
    document.getElementById('dTable').style.width = 10 * colsCount + "vw";

    document.getElementById('saveDiv').style = "display:block;";
    document.dataSaveForm.onclick = saveToStorage(rowsCount, colsCount, data)
    document.getElementById('dataSave').tabIndex = tabIndex++;
    document.getElementById('dataSave').addEventListener('keydown', (e) => {
        if (e.key == 'Enter') 
            document.dataSaveForm.saveButton.click();
    })
}


function saveToStorage(rowsCount, colsCount, data) {
    sessionStorage.setItem('rowsCount', rowsCount);
    sessionStorage.setItem('colsCount', colsCount);
    sessionStorage.setItem('content', JSON.stringify(data));
}   


function loadData() {
    document.getElementById('dhtml-section').classList.remove('hidden');

    data = JSON.parse(sessionStorage.getItem('content'));
    rowsCount = sessionStorage.getItem('rowsCount');
    colsCount = sessionStorage.getItem('colsCount');

    drawTable(rowsCount, colsCount, data);
}