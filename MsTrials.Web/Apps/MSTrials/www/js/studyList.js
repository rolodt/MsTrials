var calledFromIndex = true;
var reloadMainPage = false;
var resourcesStorageKey = 'resources';
var langSelected = '';
var filterStorageKey = "filters_for_";
var lastHomeMedicamentoId = null;
var lastHomeComparadorId = null;
var lastHomeIndicacionId = null;
var lastHomeSponsorId = null;
var lastHomePrimerAutorId = null;
var lastRankingMedicamentoId = null;
var lastRankingComparadorId = null;
var lastRankingIndicacionId = null;
var lastRankingSponsorId = null;
var lastRankingPrimerAutorId = null;
//var recordsPerPage = 9;
//var latestEstudioId = 0;
var lastEstudioIdStorageKey = "lastEstudioId";
var previousPageStorageKey = "previousPage";
var firstExecutionStorageKey = "firstExecution";
var estudiosStorageKey = "estudios";
//var homePageNumberStorageKey = "homePageNumber"
var modeStorageKey = "mode";
var rankingStorageKey = "ranking";
var estudioStorageKey = "estudio";
var offlineModeStorageKey = "offlinemode";
var langSelectedStorageKey = "langSelected";

$(document).on("pageinit", "#studyListPage", function (event) {
    console.log('pageinit studyListPage');

    langSelected = localStorage.getItem(langSelectedStorageKey) != null ? localStorage.getItem(langSelectedStorageKey) : 'es-ES';

    if (typeof (cordova) !== 'undefined') {
        document.addEventListener("deviceready", function () { deviceReady(); }, false);
    } else {
        executeGetCultureResources();
        initializeAppOfflineChecker();
        startTest();
    }
    //executeGetCultureResources();
    //initializeAppOfflineChecker();

    initializeLoaderPrototype();
    $.mobile.page.prototype.options.domCache = true;
               
    loadHomeFilters();

    $(".iscroll-wrapper", this).bind({
        "iscroll_onpulldown": onPullDown/*,
        "iscroll_onpullup": onPullUp*/
    });
});

$(document).on("pageshow", "#studyListPage", function () {
    console.log('pageshow w ' + reloadMainPage);
    if (reloadMainPage) {
        console.log('reload');
        reloadMainPage = false;
        loadHomeFilters();
        //localStorage.setItem(homePageNumberStorageKey, 1);
        //executeGet(null, false);
        showLoadingSpinner();
        if (OnlineTester.isOnline()) {
            executeGetEstudiosByFilter(null, false);
        } else {
            //manual refine search
            var allStudies = localStorage.getItem("all_" + estudiosStorageKey);
            if (allStudies != null) {
                allStudies = JSON.parse(allStudies).estudios;
                console.log(allStudies);
                console.log(lastHomeMedicamentoId);
                var filteredStudies = getFilteredStudies(allStudies, lastHomeMedicamentoId, lastHomeIndicacionId, lastHomeComparadorId, lastHomeSponsorId, lastHomePrimerAutorId);
                console.log(filteredStudies);
                if (filteredStudies.length == 0) {
                    $('#studyList li').remove();
                    $('#studyList li').listview('refresh');
                    $('#divNoItemsFound').show();
                    var studies = JSON.parse(localStorage.getItem(estudiosStorageKey));
                    studies.estudios = new Array();
                    localStorage.setItem(estudiosStorageKey, JSON.stringify(studies));
                } else {
                    $('#divNoItemsFound').hide();
                    insertStudiesIntoTarget(filteredStudies, 'studyList', 'index.html');
                    var studies = JSON.parse(localStorage.getItem(estudiosStorageKey));
                    studies.estudios = filteredStudies;
                    localStorage.setItem(estudiosStorageKey, JSON.stringify(studies));
                }
            }
            $.mobile.loading("hide");
        }
    } else {
        //this is the very first time
        //console.log('very first time');
        if (localStorage.getItem(estudiosStorageKey) == null) {
            //console.log('very first time');
            //localStorage.setItem(homePageNumberStorageKey, 1);
            //showLoadingSpinner();
            //executeGetEstudiosByFilter(null, false);
        } else {
            //I think this is just for web. You have local storage but it can be your first time
            console.log('len' + $('ul#studyList li').length);
            if ($('ul#studyList li').length == 0) {
                console.log('load local storage');
                var result = JSON.parse(localStorage.getItem(estudiosStorageKey));
                if (result.estudios.length == 0) {
                    $('#studyList li').remove();
                    $('#studyList li').listview('refresh');
                    $('#divNoItemsFound').show();
                    //localStorage.setItem(homePageNumberStorageKey, 1); //asi podemos hacer pull down de nuevo
                } else {
                    //latestEstudioId = result.estudios[0].id;
                    insertStudiesIntoTarget(result.estudios, 'studyList', 'index.html'); 
                }
            }
        }
    }
});

function getFilteredStudies(studies, medicamentoId, indicacionId, comparadorId, sponsorId, primerAutorId) {
    var filteredStudies = new Array();

    $.each(studies, function (index, study) {
        if ((medicamentoId == 0 || study.medicamentoId == medicamentoId) && (indicacionId == 0 || study.indicacionId == indicacionId) && (comparadorId == 0 || study.comparadorId == comparadorId) && (sponsorId == 0 || study.sponsorId == sponsorId) && (primerAutorId == 0 || study.primerAutorId == primerAutorId))
            filteredStudies.push(study);
    });

    return filteredStudies;
}

function insertStudiesIntoTarget(studies, targetName, page) {
    $('#' + targetName + ' li').remove();

    $.each(studies, function (index, study) {
        $('#' + targetName).append('<li class="ui-btn"><a href="studyDetails.html" onclick="setParamsForStudyDetailsPage(\'' + study.id + '\', \'' + page +'\'); return true;">' +
                    '<div class="thumbContainer"><img src="' + TypeDefAsync.getApiRootUrl() + study.imageUrl + '"/></div>' +
                    '<h4>' + study.nombre + '</h4>' +
                    '<p>' + study.titulo + '</p>' +
                    '</a></li>');
    });

    $('#' + targetName).listview('refresh');
}

function onPullDown(event, data) {
    executeGet(data, false);
}

/*function onPullUp(event, data) {
    console.log(localStorage.getItem(homePageNumberStorageKey));
    if (localStorage.getItem(homePageNumberStorageKey) > 1)
        executeGet(data, true);
    else
        data.iscrollview.refresh();
}*/

function initializeLoaderPrototype(){
    $.mobile.loader.prototype.options.text = "";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "z";
    $.mobile.loader.prototype.options.html = "";
}

function setCalledFromIndex() {
    calledFromIndex = true;
    return true;
}

var startTest = function () {
    // see console output for debug info
    ImgCache.options.debug = true;
    ImgCache.options.usePersistentCache = true;
    ImgCache.init();
};

function deviceReady() {
    setDeviceLanguage();
    initializeAppOfflineChecker();
    startTest();
    document.addEventListener("backbutton", backKeyDown, true);
}

function backKeyDown() {
    navigator.app.exitApp(); // To exit the app! Or leave empty if you want to disable it!
    //navigator.app.backPage
    //navigator.app.href
    //window.history.back();
    //$.mobile.navigate
}

function setDeviceLanguage() {
    try {
        navigator.globalization.getLocaleName(
                  function (locale) {
                      //alert(locale.value);
                      langSelected = locale.value.substr(0, 2) == 'es' ? 'es-ES' : 'en-US';
                      localStorage.setItem(langSelectedStorageKey, langSelected);
                      loadIndexResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
                      executeGetCultureResources();
                  },
                  function () { }
        );
    }
    catch(err) {
        executeGetCultureResources();
    }
    
}

function loadIndexResources(resources) {
    if (resources != null) {
        $('#aRefine').html(resources[langSelected]['refine']);
        $('#aContact').html(resources[langSelected]['contact']);
        $('#aStudies').html(resources[langSelected]['studies']);
        $('#divNoItemsFound').html(resources[langSelected]['emptyRecords']);
        $('#filterBasic-input').attr('placeholder', resources[langSelected]['filterText']);
    }
}

function executeGetCultureResources() {
    showLoadingSpinner();
    TypeDefAsync.getCultureResources(resourcesStorageKey,
        function (resources) {
            //by this moment the genericHandler (inside TypeDefAsyns) has already saves the resources into local storage.
            loadIndexResources(resources);
            if (localStorage.getItem(estudiosStorageKey) == null) {
                //showLoadingSpinner();
                executeGetEstudiosByFilter(null, false);
            }else{
                $.mobile.loading("hide");
            }
        },
        function () {
            $.mobile.loading("hide");
            //externalFailCallback is called only when the request returns an error (in case of error both success and fail callbacks are executed)
            //If there is no connectivity, this callback isn't reached. In that case, the executeSuccessCallback will be called but with what is stored in local storage (because the request is not invoked).
            setTimeout(executeGetCultureResources(), 1000);
        }
    );
}

function showLoadingSpinner() {
    $.mobile.loading('show', {
        text: $.mobile.loader.prototype.options.text,
        textVisible: $.mobile.loader.prototype.options.textVisible,
        theme: $.mobile.loader.prototype.options.theme,
        html: $.mobile.loader.prototype.options.html
    });
}

function loadHomeFilters() {
    var homeKey = filterStorageKey + 'home';
    var homeObject = localStorage.getItem(homeKey) != null ? JSON.parse(localStorage.getItem(homeKey)) : null;
    lastHomeMedicamentoId = (homeObject != null ? homeObject.medicamentoId : null);
    lastHomeComparadorId = (homeObject != null ? homeObject.comparadorId : null);
    lastHomeIndicacionId = (homeObject != null ? homeObject.indicacionId : null);
    lastHomeSponsorId = (homeObject != null ? homeObject.sponsorId : null);
    lastHomePrimerAutorId = (homeObject != null ? homeObject.primerAutorId : null);
}

function executeGetEstudiosByFilter(data, isPullUp) {

    $('#divNoItemsFound').hide();
    //showLoadingSpinner();

    /*var lastEstudioId = 0;
    if (!isPullUp && localStorage.getItem(homePageNumberStorageKey) != 1)
        lastEstudioId = latestEstudioId;*/

    //var isFirstExecution = (localStorage.getItem(homePageNumberStorageKey) == 1);

    TypeDefAsync.getEstudiosByFilter(
            { medicamentoId: lastHomeMedicamentoId, comparadorId: lastHomeComparadorId, indicacionId: lastHomeIndicacionId, sponsorId: lastHomeSponsorId, primerAutorId: lastHomePrimerAutorId, maxRecords: /*recordsPerPage*/0, pageNumber: /*localStorage.getItem(homePageNumberStorageKey)*/1/*, lastEstudioId: lastEstudioId*/ },
            estudiosStorageKey,
            function (result) {

                /*if (result.estudios.length > 0 && !isPullUp) {
                    latestEstudioId = result.estudios[0].id;
                }*/

                /*if (isPullUp || isFirstExecution) {
                    if (result.estudios.length < recordsPerPage)
                        localStorage.setItem(homePageNumberStorageKey, -1);
                    else
                        localStorage.setItem(homePageNumberStorageKey, parseInt(localStorage.getItem(homePageNumberStorageKey), 10) + 1);
                }*/
                
                if(result != null){
                                     
                    if (result.estudios.length == 0 /*&& isFirstExecution*/) {
                        $('#divNoItemsFound').show();
                        //localStorage.setItem(homePageNumberStorageKey, 1); //asi podemos hacer pull down de nuevo
                    }

                    $('#studyList li').remove();
                
                    studies = result.estudios;
                    var content = '';
                    $.each(studies, function (index, study) {
                        //if (isPullUp || isFirstExecution) {
                            $('#studyList').append('<li class="ui-btn"><a href="studyDetails.html" onclick="setParamsForStudyDetailsPage(\'' + study.id + '\', \'index.html\'); return true;">' +
                                    '<div class="thumbContainer"><img src="' + TypeDefAsync.getApiRootUrl() + study.imageUrl + '"/></div>' +
                                    '<h4>' + study.nombre + '</h4>' +
                                    '<p>' + study.titulo + '</p>' +
                                    '</a></li>');

                        //var target = $('<img src="' + TypeDefAsync.getApiRootUrl() + study.imageUrl + '"/>');

                        /*} else {
                            content += '<li class="ui-btn"><a href="studyDetails.html" onclick="setParamsForStudyDetailsPage(\'' + study.id + '\', \'index.html\'); return true;">' +
                                    '<div class="thumbContainer"><img src="' + TypeDefAsync.getApiRootUrl() + study.imageUrl + '"/></div>' +
                                    '<h4>' + study.nombre + '</h4>' +
                                    '<p>' + study.titulo + '</p>' +
                                    '</a></li>';
                        }*/
                    });
                                     

                /*if (!(isPullUp || isFirstExecution))
                    $('#studyList').prepend(content);*/
                                     
                }

                $.mobile.loading("hide");
                $('#studyList').listview('refresh');

                if (data != null) {
                    /*var iscrollview = data.iscrollview;
                    if (isPullUp) {
                        iscrollview.refresh(null, null,
                                $.proxy(function afterRefreshCallback(iscrollview) {
                                    //this.scrollToElement(lastItemSelector, 400);
                                    scrollTo(0, 100, 400, true);
                                }, iscrollview));
                    }else*/
                        data.iscrollview.refresh();
                }

                $('img').each(function () {
                    var target = $(this);
                    console.log(target.attr('src'));
                    if (TypeDefAsync.getApiRootUrl() != target.attr('src')) {
                        ImgCache.isCached(target.attr('src'), function (path, success) {
                            console.log(success);
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
                });
            },
            function (error) {
                $.mobile.loading("hide");
                if (data != null)
                    data.iscrollview.refresh();
                //$('#loadingSpinDiv').removeClass('isLoading');
                //target.append('<h3 class="text-error">' + error.errorMsg + '</h3>');
            }, false/*(localStorage.getItem(homePageNumberStorageKey) > 1)*/, false/*(!isPullUp && !isFirstExecution)*/
    );
}

function executeGet(data, isPullUp) {
    $.mobile.loading('hide');
    /*if (localStorage.getItem(homePageNumberStorageKey) == 1) {
        $('#studyList li').remove();
        $('#studyList').listview('refresh');
    }*/

    executeGetEstudiosByFilter(data, isPullUp);
}

function gotoIndex() {
    window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/index.html';
}

function setParamsForStudyDetailsPage(estudioId, backPage) {
    localStorage.setItem(previousPageStorageKey, backPage);
    localStorage.setItem(lastEstudioIdStorageKey, estudioId);
}

function initializeAppOfflineChecker() {
    if (localStorage.getItem(offlineModeStorageKey) == 1)
        showAppOffline();

    setInterval(function () {
        OnlineTester.checkInternetConnectivity(
            function () {
                var targets = $("span[id*='offlineText']");
                targets.html(localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['appOnline'] : 'The app is back online');

                targets = $("div[id*='informAppOffline']");
                setTimeout(function () { targets.fadeOut('slow'); }, 5000);

            },
            function () {
                showAppOffline();
            }
        )
    }, 5000);
}

function showAppOffline() {
    var targets = $("span[id*='offlineText']");
    targets.html(localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['appOffline'] : 'The app is offline');

    targets = $("div[id*='informAppOffline']");
    targets.fadeIn('slow');
}