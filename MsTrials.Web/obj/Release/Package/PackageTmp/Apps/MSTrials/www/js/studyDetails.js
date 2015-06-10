$('#detailsPage').live('pageshow', function(event) {
    var id = getUrlVars()["id"];
    TypeDefAsync.incrementEstudioViews({ estudioId: id });
    executeGetEstudioById(id); 
});

function executeGetEstudioById(id) {
    TypeDefAsync.getEstudioById({ estudioId: id }, "estudio" + id,
            displayStudy, null);  
}


function displayStudy(result) {
    if (result != undefined) {
        console.log(result);
        $('#studyPic').attr('src', result.imageUrl);
        $('#name').text(result.nombre);
        $('#title').text(result.titulo);
        
        $('#actionList').append('<li><a href="showDetails?mode=objectives&id=' + result.id +'"><h3>Objectives</h3></a></li>');

        $('#actionList').listview('refresh');
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
