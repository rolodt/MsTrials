$('#studyListPage').bind('pageinit', function(event) {
    executeGetEstudiosByFilter(1);
});

function executeGetEstudiosByFilter(pageNumber) {

    var lastMedicamentoId = null;
    var lastComparadorId = null;
    var lastIndicacionId = null;
    var lastSponsorId = null;
    var lastPrimerAutorId = null;
    var recordsPerPage = 8;

    //var target = $("#search-results");
    //target.empty();
    //$('#loadingSpinDiv').addClass('isLoading');

    TypeDefAsync.getEstudiosByFilter(
            { medicamentoId: lastMedicamentoId, comparadorId: lastComparadorId, indicacionId: lastIndicacionId, sponsorId: lastSponsorId, primerAutorId: lastPrimerAutorId, maxRecords: recordsPerPage, pageNumber: pageNumber },
            "estudios",
            function (result) {
                $('#studyList li').remove();
                studies = result.estudios;
                $.each(studies, function (index, study) {
                    $('#studyList').append('<li><a href="studyDetails.html?id=' + study.id + '">' +
                            '<img src="' + study.imageUrl + '"/>' +
                            '<h4>' + study.nombre + '</h4>' +
                            '<p>' + study.titulo + '</p>' +
                            '</a></li>');
                });
                $('#studyList').listview('refresh');
                //$('#loadingSpinDiv').removeClass('isLoading');

                /*var html = '';
                if (result == undefined || result.length == 0) {
                    html = '<h3 class="text-error">' + (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[$('#lang').val()]['emptyRecords'] : '') + '</h3>';
                } else {
                    html = '<ul class="listing">';
                    var className = 'one_half';
                    var last = ' last';
                    for (var i = 0; i < result.estudios.length; i++) {
                        var estudio = result.estudios[i];
                        var myUrl = '@Url.Action("edit","estudio")/' + estudio.nombre;
                        html += '<li class="' + className + '">';
                        html += '<a href="' + myUrl + '">';
                        html += '<img src="' + estudio.imageUrl + '" alt="" style="max-height: 93px; max-width: 272px;">';
                        html += '<h3><span>' + estudio.titulo + '</span></h3>';
                        html += '<span class="price">';
                        for (x = 0; x < estudio.primerAutor.length; x++) {
                            html += '<span class="char' + (x + 1) + '">' + estudio.primerAutor.charAt(x) + '</span>';
                        }
                        html += '</span>';
                        html += '<ul class="listing-info">';
                        html += '<li>Año ' + estudio.año + '</li>';
                        html += '<li>Rev. ' + estudio.revision + '</li>';
                        html += '<li>Vol. ' + estudio.volumen + '</li>';
                        html += '</ul>';
                        html += '</a>';
                        html += '</li>';

                        if (className.indexOf(last) > -1)
                            className = className.replace(last, '');
                        else
                            className += last;
                    }
                    html += '</ul>';

                    var numberOfPages = Math.ceil(result.totalRecords / recordsPerPage);
                    var i = 1;
                    var htmlPages = '<li id="liPaginas">' + (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[$('#lang').val()]['pages'] : 'Páginas:') + '</li>';
                    while (i <= numberOfPages) {
                        if (i == pageNumber)
                            htmlPages += '<li>' + i + '</li>';
                        else
                            htmlPages += '<li><a href="javascript:void(0)" onclick="executeGetEstudiosByFilter(' + i + ')">' + i + '</a></li>';
                        i++;
                    }
                    $('#ulPages').empty();
                    $('#ulPages').append(htmlPages);
                }
                target.append(html);*/
            },
            function (error) {
                //$('#loadingSpinDiv').removeClass('isLoading');
                //target.append('<h3 class="text-error">' + error.errorMsg + '</h3>');
            }
    );
}

function executeGetRankingByFilter(pageNumber) {

    /*var target = $("#search-results");
    target.empty();
    $('#loadingSpinDiv').addClass('isLoading');*/

    var lastMedicamentoId = null;
    var lastComparadorId = null;
    var lastIndicacionId = null;
    var lastSponsorId = null;
    var lastPrimerAutorId = null;
    var recordsPerPage = 2;

    TypeDefAsync.getRankingByFilter(
            { medicamentoId: lastMedicamentoId, comparadorId: lastComparadorId, indicacionId: lastIndicacionId, sponsorId: lastSponsorId, primerAutorId: lastPrimerAutorId, maxRecords: recordsPerPage, pageNumber: pageNumber },
            "ranking",
            function (result) {
                //$('#loadingSpinDiv').removeClass('isLoading');

                $('#studyList li').remove();
                studies = result.estudios;
                $.each(studies, function (index, study) {
                    $('#studyList').append('<li><a href="studyDetails.html?id=' + study.id + '">' +
                            '<img src="' + study.imageUrl + '"/>' +
                            '<h4>' + study.nombre + '</h4>' +
                            '<p>' + study.titulo + '</p>' +
                            '</a></li>');
                });
                $('#studyList').listview('refresh');
            },
            function (error) {
                //$('#loadingSpinDiv').removeClass('isLoading');
                //target.append('<h3 class="text-error">' + error.errorMsg + '</h3>');
            }
    );
}

function changeNavbarSelection(tag, mode) {
    console.log('changeNavbarSelection');
    console.log(mode);
    if (tag.className.indexOf('active') > -1)
        return;

    if (mode == 'home')
        executeGetEstudiosByFilter(1);
    else
        if(mode == 'ranking')
            executeGetRankingByFilter(1);

}