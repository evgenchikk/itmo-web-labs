rowsCount = 0;
colsCount = 0;
tabIndex = 5;


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

    // alert("Rows: " + rowsCount + "\nCols: " + colsCount);

    if (rowsCount <= 0 || colsCount <= 0 || !Number.isInteger(parseInt(rowsCount)) || !Number.isInteger(parseInt(colsCount))) 
        alert('Wrong format');
    else 
        createTable(rowsCount, colsCount);
}


function createTable(rowsCount, colsCount) {
    tableText = "<form name=\"tableContent\"><table id=\"dTable\"><tbody>";

    for (i = 0; i < rowsCount; i++) {
        tableText += "<tr>";
        for (j = 0; j < colsCount; j++) {
            tableText += "<td style=\"text-align:center!important;\"><textarea tabindex=" + tabIndex + " name=\"tableTextarea\" style=\"height:90%; width:90%; opacity:0.5;\"></textarea></td>";
            tabIndex += 1;
        }
        tableText += "</tr>";
    }
    tableText += "</tbody></table><br><span id=\"textSubmit\" tabindex=" + tabIndex + "><input type=\"button\" name=\"button\" onclick=\"inputText(" + rowsCount + "," + colsCount + ")\" value=\"Отрисовка\"></span></form>"
    tabIndex += 1;

    divBlock = document.getElementById('dhtmlDiv');
    divBlock.innerHTML = tableText;

    document.getElementById('dTable').style.height = 10 * rowsCount + "vh";
    document.getElementById('dTable').style.width = 10 * colsCount + "vw";

    document.getElementById('dhtml-section').classList.remove('hidden');


    document.getElementById('textSubmit').addEventListener('keydown', (e) => {
        if (e.key == 'Enter') 
            document.tableContent.button.click();
    })
}


function inputText(rowsCount, colsCount) {
    allTextNodeList = document.getElementsByName('tableTextarea');
    allText = [];

    for (i = 0; i < allTextNodeList.length; i++) 
        allText.push(allTextNodeList[i].value);
    

    document.getElementById('dTable').remove();
    tableText = "<table id=\"dTable\"><tbody>";
    for (i = 0; i < rowsCount; i++) {
        tableText += "<tr>";
        for (j = 0; j < colsCount; j++) 
            tableText += "<td style=\"text-align:center!important;\">" + allText[i * colsCount + j] + "</td>";
        
        tableText += "</tr>";
    }
    tableText += "</tbody></table>"

    divBlock = document.getElementById('dhtmlDiv');
    divBlock.innerHTML = tableText + "<br><form name=\"dataSaveForm\"><span id=\"dataSave\" tabindex=" + tabIndex + "><input type=\"button\" name=\"button\" onclick=\"saveToStorage()\" value=\"Save data\"></span></form>";
    tabIndex += 1;

    document.getElementById('dTable').style.height = 10 * rowsCount + "vh";
    document.getElementById('dTable').style.width = 10 * colsCount + "vw";

    document.getElementById('dataSave').addEventListener('keydown', (e) => {
        if (e.key == 'Enter') 
            document.dataSaveForm.button.click();
    })
}


function saveToStorage() {
    data = document.getElementById('dhtmlDiv').innerHTML;
    sessionStorage.setItem('table', data);
}   


function loadData() {
    if ((document.getElementById('dhtmlDiv').innerHTML = sessionStorage.getItem('table')) == null) {
        alert('No data in session storage');
        return;
    }
    document.getElementById('dhtml-section').classList.remove('hidden');
}