var TypeDefAsync = new function ()   {
    var me = this; 

    var postSyncFunctions = [];
    
    /************* Async Methods ****************/

    function saveJSONToLocalStorage(localStorageKey, response, accumulateResults, isPullDown) {
        //this if is obsolete because it was designed to ask for new studies (but now the pull down refreshes the whole list)
        if (accumulateResults || isPullDown) {
            //$.merge(response.estudios, JSON.parse(localStorage.getItem(localStorageKey)).estudios);
            if (response.estudios.length > 0) {
                //var copiedResponse = jQuery.extend({}, response);
                var copiedResponse = JSON.parse(JSON.stringify(response));
                var mergedEstudios;
                //console.log(JSON.parse(localStorage.getItem(localStorageKey)).estudios);
                //console.log(copiedResponse.estudios);
                if (isPullDown) {
                    //si es pull down queremos que queden arriba.
                    mergedEstudios = $.merge(copiedResponse.estudios, JSON.parse(localStorage.getItem(localStorageKey)).estudios);
                } else {
                    mergedEstudios = $.merge(JSON.parse(localStorage.getItem(localStorageKey)).estudios, copiedResponse.estudios);
                }
                copiedResponse.estudios = mergedEstudios;
                localStorage.setItem(localStorageKey, JSON.stringify(copiedResponse));
                //console.log(JSON.parse(localStorage.getItem(localStorageKey)).estudios);
            }
        } else {
            localStorage.setItem(localStorageKey, JSON.stringify(response));
            if (localStorageKey == estudiosStorageKey || localStorageKey == rankingStorageKey) {
                $.each(response.estudios, function (index, estudio) {
                    localStorage.setItem(estudioStorageKey + estudio.id, JSON.stringify(estudio));
                });
                //and we need to store all the studies and rankings just in case the user uses the refine search without internet connection
                if (localStorageKey == estudiosStorageKey && localStorage.getItem("all_" + estudiosStorageKey) == null)
                    localStorage.setItem("all_" + estudiosStorageKey, JSON.stringify(response));
                if (localStorageKey == rankingStorageKey && localStorage.getItem("all_" + rankingStorageKey) == null)
                    localStorage.setItem("all_" + rankingStorageKey, JSON.stringify(response));
            }
        }
    }

    function getGenericErrorHandler(extraParameters, externalSuccessCallback) {
        console.log("getGenericErrorHandler");
        if (externalSuccessCallback != null && typeof (externalSuccessCallback) != "undefined") {
            if (extraParameters.filters == null) {
                console.log('getting from local storage ' + extraParameters.localStorageKey);
                var obj = localStorage.getItem(extraParameters.localStorageKey);
                externalSuccessCallback(JSON.parse(obj));
            } else {
                //if timeout occurs...then try to filter the collection that contains all the studies.
                var allStudies = localStorage.getItem("all_" + extraParameters.localStorageKey);
                var result = JSON.parse(localStorage.getItem(extraParameters.localStorageKey));
                if (allStudies != null) {
                    allStudies = JSON.parse(allStudies).estudios;

                    filteredStudies = new Array();

                    $.each(allStudies, function (index, study) {
                        if ((extraParameters.filters.medicamentoId == 0 || study.medicamentoId == extraParameters.filters.medicamentoId) && (extraParameters.filters.indicacionId == 0 || study.indicacionId == extraParameters.filters.indicacionId) && (extraParameters.filters.comparadorId == 0 || study.comparadorId == extraParameters.filters.comparadorId) && (extraParameters.filters.sponsorId == 0 || study.sponsorId == extraParameters.filters.sponsorId) && (extraParameters.filters.primerAutorId == 0 || study.primerAutorId == extraParameters.filters.primerAutorId))
                            filteredStudies.push(study);
                    });

                    result.estudios = filteredStudies;
                }


                externalSuccessCallback(result);
            }
        }

    }

    function getGenericSuccessHandler(validationResult, extraParameters, accumulateResults, isPullDown) {
        console.log("getGenericSuccessHandler");
        if (validationResult != null) {
            saveJSONToLocalStorage(extraParameters.localStorageKey, validationResult, accumulateResults, isPullDown);
        }
    }

    var apiRootUrl = "http://condor1683.startdedicated.com:81";

    me.getApiRootUrl = function () {
        return apiRootUrl;
    }

   

    me.getRecommendedEstudiosByFilter = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.medicamentoId = searchParams.medicamentoId;
        data.comparadorId = searchParams.comparadorId;
        data.indicacionId = searchParams.indicacionId;
        data.sponsorId = searchParams.sponsorId;
        data.primerAutorId = searchParams.primerAutorId;
        data.maxRecords = searchParams.maxRecords;
        
        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetRecommendedByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.getEstudiosByFilter = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback, accumulateResults, isPullDown) {
        accumulateResults = typeof accumulateResults !== 'undefined' ? accumulateResults : false;
        isPullDown = typeof isPullDown !== 'undefined' ? isPullDown : false;
        var data = {};
        data.medicamentoId = searchParams.medicamentoId;
        data.comparadorId = searchParams.comparadorId;
        data.indicacionId = searchParams.indicacionId;
        data.sponsorId = searchParams.sponsorId;
        data.primerAutorId = searchParams.primerAutorId;
        data.maxRecords = searchParams.maxRecords;
        data.pageNumber = searchParams.pageNumber;
        //data.lastEstudioId = searchParams.lastEstudioId;
        //data.callback = "localJsonpCallback";

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback, "GET", accumulateResults, isPullDown);
    }

    me.getRankingByFilter = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback, accumulateResults) {
        accumulateResults = typeof accumulateResults !== 'undefined' ? accumulateResults : false;
        var data = {};
        data.medicamentoId = searchParams.medicamentoId;
        data.comparadorId = searchParams.comparadorId;
        data.indicacionId = searchParams.indicacionId;
        data.sponsorId = searchParams.sponsorId;
        data.primerAutorId = searchParams.primerAutorId;
        data.maxRecords = searchParams.maxRecords;
        data.pageNumber = searchParams.pageNumber;

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetRankingByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback, "GET", accumulateResults);
    }

    me.getEstudioById = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.estudioId = searchParams.estudioId;

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetById", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.getAllEstudios = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apiestudio/GetAll", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.getAllAutores = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apiautor/GetAll", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.getMedicamentos = function (localStorageKey, externalSuccessCallback) {
        sendRequest("apisearch/GetMedicamentos", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, null);
    }

    me.getComparadores = function (localStorageKey, externalSuccessCallback) {
        sendRequest("apisearch/GetComparadores", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, null);
    }

    me.getIndicaciones = function (localStorageKey, externalSuccessCallback) {
        sendRequest("apisearch/GetIndicaciones", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, null);
    }

    me.getSponsors = function (localStorageKey, externalSuccessCallback) {
        sendRequest("apisearch/GetSponsors", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, null);
    }

    me.getAutoresForDropDown = function (localStorageKey, externalSuccessCallback) {
        sendRequest("apisearch/GetAutores", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, null);
    }

    me.incrementEstudioViews = function (searchParams) {
        var data = {};
        data.estudioId = searchParams.estudioId;

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetIncrementEstudioViews", stringified, null, null, null, null, null, "GET");
    }

    me.sendEmail = function (searchParams, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.subject = searchParams.subject;
        data.name = searchParams.name;
        data.email = searchParams.email;

        var stringified = JSON.stringify(data);
        sendRequest("apicontacto/GetSendEmail", stringified, null, {}, null, externalSuccessCallback, externalFailCallback, "GET");
    }

    me.getCultureResources = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apiculture/GetAll", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.subscribeToNewsletter = function (searchParams, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.email = searchParams.email;

        var stringified = JSON.stringify(data);
        sendRequest("apicontacto/GetSubscribeToNewsletter", stringified, null, {}, null, externalSuccessCallback, externalFailCallback, "GET");
    }

    function sendRequest(action, jsonData, errorHandler, extraParameters, successHandler, externalSuccessCallback, externalFailCallback, httpMethod, accumulateResults, isPullDown) {
        //"apiestudio/GetByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback, "GET", accumulateResults, isPullDown);
        //"apiestudio/GetById", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
        httpMethod = typeof httpMethod !== 'undefined' ? httpMethod : "GET";
        accumulateResults = typeof accumulateResults !== 'undefined' ? accumulateResults : false;
        isPullDown = typeof isPullDown !== 'undefined' ? isPullDown : false;
        if (!OnlineTester.isOnline()) {

            if (errorHandler != null) {
                extraParameters.ErrorMsg = "No network connectivity available to sync the object";
                errorHandler(extraParameters, externalSuccessCallback);
            }

            return;
        }

        if (jsonData != '') {
            var parsedData = JSON.parse(jsonData);
            jsonData = JSON.stringify(parsedData);
        }
        
        console.log(apiRootUrl + "/api/" + action);

        /*$.ajax({
            type: httpMethod,
            contentType: "application/json; charset=utf-8",
            url: apiRootUrl + "/api/" + action,
            data: httpMethod == "GET" ? {searchParams : jsonData} : jsonData,
            dataType: "json",*/
        /*$.jsonp({
            type: httpMethod,
            url: apiRootUrl + "/api/" + action,
            jsonpCallback: 'callback',
            data: httpMethod == "GET" ? { searchParams: jsonData } : jsonData,
            dataType: "jsonp",*/
        $.ajax({
            url: apiRootUrl + "/api/" + action,
            data: { searchParams: jsonData },
            type: httpMethod,
            dataType: "jsonp",
            timeout: 15000,
            //jsonpCallback: "localJsonpCallback",
            success: function (data) {
                console.log('success');
               //alert('success');
                var validationResult = data;

                if (successHandler != null) {
                    successHandler(validationResult, extraParameters, accumulateResults, isPullDown);
                }

                if (externalSuccessCallback != null && typeof (externalSuccessCallback) != "undefined") {
                    externalSuccessCallback(validationResult);
                }

            },
            error: function (data, status) {
               console.log("sendRequest: ERROR ");
               //console.log(data.status);
               //console.log(status + ' len ' + status.length);
               extraParameters.filters = null;
               
               if (data.status == 0) {
                    if (errorHandler != null) {
                        extraParameters.ErrorMsg = "No network connectivity available to sync the object";

                        if (status == 'timeout' && (extraParameters.localStorageKey == estudiosStorageKey || extraParameters.localStorageKey == rankingStorageKey))
                            extraParameters.filters = JSON.parse(jsonData); 

                        errorHandler(extraParameters, externalSuccessCallback);
                    }
                }
                else if (data.status == 500) //server side exception
                {
                   
                }
                else {
                    if (errorHandler != null) {
                        extraParameters.ErrorMsg = "An error occurred. Please try again.";

                        errorHandler(extraParameters, externalSuccessCallback);
                    }
                }

                console.log('externalFailCallback');

                if (externalFailCallback != null && typeof (externalFailCallback) != "undefined") {
                    //alert(1);
                    extraParameters.ErrorMsg = "An error occurred. Please try again.";
                    //extraParameters.ErrorMsg = (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['errorOccured'] : "An error occurred. Please try again.");
                    console.log('extraParameters');
                    externalFailCallback(extraParameters);
                }
            }
        });
    }

    /*window.localJsonpCallback = function (data) {
        console.log(data);
    };*/
}