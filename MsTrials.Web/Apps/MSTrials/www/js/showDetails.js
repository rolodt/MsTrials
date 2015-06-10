var mode = '';

$(document).on("pageshow", "#showDetailsPage", function () {
    calledFromShowDetails = true;
    var id = localStorage.getItem(lastEstudioIdStorageKey); //getUrlVars()["id"];
    
    mode = localStorage.getItem(modeStorageKey);//getUrlVars()["mode"];
    console.log('pageshow ' + id + ' ' + mode);
    setHeaderText();
    executeGetEstudioDetailsById(id); 
});

function setHeaderText() {
    var resources = JSON.parse(localStorage.getItem(resourcesStorageKey));
    if (resources == null) return;
    switch (mode) {
        case "objectives":
            $('#headerShow').html(resources[langSelected]['objectives']);
            break;
        case "method":
            $('#headerShow').html(resources[langSelected]['method']);
            break;
        case "results":
            $('#headerShow').html(resources[langSelected]['results']);
            break;
        case "conclusion":
            $('#headerShow').html(resources[langSelected]['conclusion']);
            break;
    }
}

function executeGetEstudioDetailsById(id) {
    TypeDefAsync.getEstudioById({ estudioId: id }, estudioStorageKey + id,
            displayStudyDetail, null);
}

function displayStudyDetail(result) {
    console.log(result);
    if (result != undefined) {
        switch (mode) {
            case "objectives":
                $('#detail').text(result.objetivos);
                break;
            case "method":
                $('#detail').text(result.metodo);
                break;
            case "results":
                $('#detail').text(result.resultados);
                break;
            case "conclusion":
                $('#detail').text(result.conclusion);
                break;
        }
    }
}

function preGoBackToStudyDetails()
{
    $('#detail').empty();
    //window.location = 'studyDetails.html';
    return true;
}

/*function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}*/
