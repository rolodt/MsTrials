//var rankingPageNumber = 1;
//var rankingMaxRecords = 50;

$(document).on("pageinit", "#rankingPage", function (event) {
    if(!reloadMainPage)
        rankingPageInit();
});

$(document).on("pageshow", "#rankingPage", function () {
    /*if (reloadMainPage) {
        reloadMainPage = false;
        executeGetRankingByFilter(null, true);
    }*/
    /*if (!OnlineTester.isOnline() || reloadMainPage)
        rankingPageInit();*/
    if (reloadMainPage) {
        loadRankingResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
        loadRankingFilters();
        reloadMainPage = false;
        if (OnlineTester.isOnline()) {
            executeGetRankingByFilter(null, true);
        } else {
            //manual refine search
            var allStudies = localStorage.getItem("all_" + rankingStorageKey);
            if (allStudies != null) {
                allStudies = JSON.parse(allStudies).estudios;
                var filteredStudies = getFilteredStudies(allStudies, lastRankingMedicamentoId, lastRankingIndicacionId, lastRankingComparadorId, lastRankingSponsorId, lastRankingPrimerAutorId);
                if (filteredStudies.length == 0) {
                    $('#rankingList li').remove();
                    $('#rankingList li').listview('refresh');
                    $('#divNoItemsFound2').show();
                    var studies = JSON.parse(localStorage.getItem(rankingStorageKey));
                    studies.estudios = new Array();
                    localStorage.setItem(rankingStorageKey, JSON.stringify(studies));
                } else {
                    $('#divNoItemsFound2').hide();
                    insertStudiesIntoTarget(filteredStudies, 'rankingList', 'ranking.html');
                    var studies = JSON.parse(localStorage.getItem(rankingStorageKey));
                    studies.estudios = filteredStudies;
                    localStorage.setItem(rankingStorageKey, JSON.stringify(studies));
                }
            }
            $.mobile.loading("hide");
        }
    }
});

function rankingPageInit() {
    loadRankingResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
    loadRankingFilters();
    //reloadMainPage = false;
    executeGetRankingByFilter(null, true);
}

function loadRankingResources(resources) {
    if (resources != null) {
        $('#aRefine2').html(resources[langSelected]['refine']);
        $('#aContact2').html(resources[langSelected]['contact']);
        $('#aStudies2').html(resources[langSelected]['studies']);
        $('#divNoItemsFound2').html(resources[langSelected]['emptyRecords']);
        $('#filterBasic-input2').attr('placeholder', resources[langSelected]['filterText']);
    }
}

function loadRankingFilters() {
    var rankingKey = filterStorageKey + 'ranking';
    var rankingObject = localStorage.getItem(rankingKey) != null ? JSON.parse(localStorage.getItem(rankingKey)) : null;
    lastRankingMedicamentoId = (rankingObject != null ? rankingObject.medicamentoId : null);
    lastRankingComparadorId = (rankingObject != null ? rankingObject.comparadorId : null);
    lastRankingIndicacionId = (rankingObject != null ? rankingObject.indicacionId : null);
    lastRankingSponsorId = (rankingObject != null ? rankingObject.sponsorId : null);
    lastRankingPrimerAutorId = (rankingObject != null ? rankingObject.primerAutorId : null);
}

function executeGetRankingByFilter(data, isPullUp) {

    $('#divNoItemsFound2').hide();
    $.mobile.loading('show', {
        text: $.mobile.loader.prototype.options.text,
        textVisible: $.mobile.loader.prototype.options.textVisible,
        theme: $.mobile.loader.prototype.options.theme,
        html: $.mobile.loader.prototype.options.html
    });

    TypeDefAsync.getRankingByFilter(
            { medicamentoId: lastRankingMedicamentoId, comparadorId: lastRankingComparadorId, indicacionId: lastRankingIndicacionId, sponsorId: lastRankingSponsorId, primerAutorId: lastRankingPrimerAutorId, maxRecords: /*rankingMaxRecords*/0, pageNumber: /*rankingPageNumber*/1 },
            rankingStorageKey,
            function (result) {
                    if(result != null){
                        if (result.estudios.length == 0 /*&& rankingPageNumber == 1*/)
                            $('#divNoItemsFound2').show();

                        $('#rankingList li').remove();
                        studies = result.estudios;
                        $.each(studies, function (index, study) {
                            $('#rankingList').append('<li class="ui-btn"><a href="studyDetails.html" onclick="setParamsForStudyDetailsPage(\'' + study.id + '\', \'ranking.html\'); return true;">' +
                                    '<div class="thumbContainer"><img src="' + TypeDefAsync.getApiRootUrl() + study.imageUrl + '"/></div>' +
                                    '<h4>' + study.nombre + '</h4>' +
                                    '<p>' + study.titulo + '</p>' +
                                    '<div class="ui-li-count rankingCountBorderColor">' + study.cantidadDeVisitas + '</div></a></li>');
                        });
                    
                    }

                    $.mobile.loading('hide');
                    $('#rankingList').listview('refresh');

                    /*if (data != null) {
                            data.iscrollview.refresh();
                    }*/

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
                //}
            },
            function (error) {
                $.mobile.loading('hide');
                //$('#loadingSpinDiv').removeClass('isLoading');
                //target.append('<h3 class="text-error">' + error.errorMsg + '</h3>');
            }, false/*(rankingPageNumber > 1)*/
    );
}
