var id = 0;
var calledFromShowDetails = false;

/*$(document).on("pageinit", "#detailsPage", function (event) {
});*/

function preGoBackToMainPage(){
    clearData();
    //window.location.href = localStorage.getItem(previousPageStorageKey);
    return true;
}

function clearData(){
    $('#studyPic').attr('src', '');
    $('#name').text('');
    $('#title').text('');
    $('#importantData').html('');
    $('#moreInfo').html('');
        
    $('#actionList li').remove();
    $('#actionList').listview('refresh');
}

$(document).on("pageshow", "#detailsPage", function () {
    if(!calledFromShowDetails){
        //clearData();
        $('#backButton').attr("href", localStorage.getItem(previousPageStorageKey));
        loadStudyDetailsResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
        id = localStorage.getItem(lastEstudioIdStorageKey);//getUrlVars()["id"];
        TypeDefAsync.incrementEstudioViews({ estudioId: id });
        executeGetEstudioById(id);
    }
    calledFromShowDetails = false;
});

function loadStudyDetailsResources(resources) {
    if (resources != null) {
        $('#header').html(resources[langSelected]['study']);
    }
}

function executeGetEstudioById(id) {
    $.mobile.loading('show', {
        text: $.mobile.loader.prototype.options.text,
        textVisible: $.mobile.loader.prototype.options.textVisible,
        theme: $.mobile.loader.prototype.options.theme,
        html: $.mobile.loader.prototype.options.html
    });
    
    TypeDefAsync.getEstudioById({ estudioId: id }, estudioStorageKey + id,
               function(result){displayStudy(result);}, function (error) { $.mobile.loading('hide'); });
}

function displayStudy(result) {
    if (typeof result !== 'undefined') {
        $('#studyPic').attr('src', TypeDefAsync.getApiRootUrl() + result.imageUrl);
        var target = $('#studyPic');
        if (TypeDefAsync.getApiRootUrl() != target.attr('src')) {
            ImgCache.isCached(target.attr('src'), function (path, success) {
                if (success) {
                    // already cached
                    ImgCache.useCachedFile(target);
                } else {
                    // not there, need to cache the image
                    ImgCache.cacheFile(target.attr('src'), function () {
                        ImgCache.useCachedFile(target);
                    });
                }
            });
        }
        $('#name').text(result.nombre);
        $('#title').text(result.titulo);
        var resources = JSON.parse(localStorage.getItem(resourcesStorageKey));
        if (resources != null) {
            $('#importantData').html('<b>' + resources[langSelected]['year'] + ' ' + '</b>' + result.anio + '<b>' + ' Rev. ' + '</b>' + result.revision + '<b>' + ' Vol. ' + '</b>' + result.volumen);
            $('#moreInfo').html('<b>' + resources[langSelected]['firstAuthor'] + ': ' + '</b>' + result.primerAutor + '<br/><b>' + resources[langSelected]['medicament'] + ': ' + '</b>' + result.medicamento + '<br/><b>' + resources[langSelected]['comercialName'] + ': ' + '</b>' + result.nombreComercial + '<br/><b>' + resources[langSelected]['comparator'] + ': ' + '</b>' + result.comparador + '<br/><b>' + resources[langSelected]['indication'] + ': ' + '</b>' + result.indicacion + '<br/><b>' + 'Sponsor: ' + '</b>' + result.sponsor);

            $('#actionList li').remove();
            
            $('#actionList').append('<li class="ui-btn"><a href="showDetails.html" onclick="setParamsForShowDetailsPage(\'objectives\')"><h3>' + resources[langSelected]['objectives'] + '</h3></a></li>');
            $('#actionList').append('<li class="ui-btn"><a href="showDetails.html" onclick="setParamsForShowDetailsPage(\'method\')"><h3>' + resources[langSelected]['method'] + '</h3></a></li>');
            $('#actionList').append('<li class="ui-btn"><a href="showDetails.html" onclick="setParamsForShowDetailsPage(\'results\')"><h3>' + resources[langSelected]['results'] + '</h3></a></li>');
            $('#actionList').append('<li class="ui-btn"><a href="showDetails.html" onclick="setParamsForShowDetailsPage(\'conclusion\')"><h3>' + resources[langSelected]['conclusion'] + '</h3></a></li>');

            $('#actionList').listview('refresh');
        }
    }
    $.mobile.loading('hide');
}

function setParamsForShowDetailsPage(mode) {
    localStorage.setItem(modeStorageKey, mode);
}
 

