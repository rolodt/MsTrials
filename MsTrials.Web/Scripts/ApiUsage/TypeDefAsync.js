var TypeDefAsync = new function ()   {
    var me = this;

    var postSyncFunctions = [];
    
    /************* Async Methods ****************/

    function saveJSONToLocalStorage(localStorageKey, response) {
        localStorage.setItem(localStorageKey, JSON.stringify(response));
    }

    function getGenericErrorHandler(extraParameters, externalSuccessCallback) {
        console.log("getGenericErrorHandler");
        if (externalSuccessCallback != null && typeof (externalSuccessCallback) != "undefined") {
            var obj = localStorage.getItem(extraParameters.localStorageKey);
            externalSuccessCallback(JSON.parse(obj));
        }

    }

    function getGenericSuccessHandler(validationResult, extraParameters) {
        console.log("getGenericSuccessHandler");
        if (validationResult != null) {
            saveJSONToLocalStorage(extraParameters.localStorageKey, validationResult);
        }
    }

    me.getUltimosEstudios = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apiestudio/GetUltimosEstudios", null, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
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

    me.getEstudiosByFilter = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.medicamentoId = searchParams.medicamentoId;
        data.comparadorId = searchParams.comparadorId;
        data.indicacionId = searchParams.indicacionId;
        data.sponsorId = searchParams.sponsorId;
        data.primerAutorId = searchParams.primerAutorId;
        data.maxRecords = searchParams.maxRecords;
        data.pageNumber = searchParams.pageNumber;

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
    }

    me.getRankingByFilter = function (searchParams, localStorageKey, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.medicamentoId = searchParams.medicamentoId;
        data.comparadorId = searchParams.comparadorId;
        data.indicacionId = searchParams.indicacionId;
        data.sponsorId = searchParams.sponsorId;
        data.primerAutorId = searchParams.primerAutorId;
        data.maxRecords = searchParams.maxRecords;
        data.pageNumber = searchParams.pageNumber;

        var stringified = JSON.stringify(data);
        sendRequest("apiestudio/GetRankingByFilter", stringified, getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, externalFailCallback);
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

    me.getMedicamentos = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apisearch/GetMedicamentos", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
    }

    me.getComparadores = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apisearch/GetComparadores", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
    }

    me.getIndicaciones = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apisearch/GetIndicaciones", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
    }

    me.getSponsors = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apisearch/GetSponsors", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
    }

    me.getAutoresForDropDown = function (localStorageKey, externalSuccessCallback, externalFailCallback) {
        sendRequest("apisearch/GetAutores", '', getGenericErrorHandler, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
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
        sendRequest("apiculture/GetAll", '', null, { localStorageKey: localStorageKey }, getGenericSuccessHandler, externalSuccessCallback, false);
    }

    me.subscribeToNewsletter = function (searchParams, externalSuccessCallback, externalFailCallback) {
        var data = {};
        data.email = searchParams.email;

        var stringified = JSON.stringify(data);
        sendRequest("apicontacto/GetSubscribeToNewsletter", stringified, null, {}, null, externalSuccessCallback, externalFailCallback, "GET");
    }

    function sendRequest(action, jsonData, errorHandler, extraParameters, successHandler, externalSuccessCallback, externalFailCallback, httpMethod) {
        httpMethod = typeof httpMethod !== 'undefined' ? httpMethod : "GET";
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

        /*$.ajax({
            type: httpMethod,
            contentType: "application/json; charset=utf-8",
            url: window.location.origin + "/api/" + action,
            data: httpMethod == "GET" ? {searchParams : jsonData} : jsonData,
            dataType: "json",*/
        $.ajax({
            url: window.location.origin + "/api/" + action,
            data: { searchParams: jsonData },
            type: httpMethod,
            dataType: "jsonp",
            success: function (a) {

                var validationResult = a;

                if (successHandler != null) {
                    successHandler(validationResult, extraParameters);
                }

                if (externalSuccessCallback != null && typeof (externalSuccessCallback) != "undefined") {
                    externalSuccessCallback(validationResult);
                }
            },
            error: function (a) {
                console.log("sendRequest: ERROR " + a);
                console.log(a.status);

                if (a.status == 0) {
                    if (errorHandler != null) {
                        extraParameters.ErrorMsg = "No network connectivity available to sync the object";

                        errorHandler(extraParameters, externalSuccessCallback);
                    }
                }
                else if (a.status == 500) //server side exception
                {
                   
                }
                else {
                    if (errorHandler != null) {
                        extraParameters.ErrorMsg = "An error occurred. Please try again.";
                        //extraParameters.ErrorMsg = (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['errorOccured'] : "An error occurred. Please try again.");
                        errorHandler(extraParameters, externalSuccessCallback);
                    }
                }

                console.log('externalFailCallback');
                if (externalFailCallback != null && typeof (externalFailCallback) != "undefined") {
                    extraParameters.ErrorMsg = "An error occurred. Please try again.";
                    //extraParameters.ErrorMsg = (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['errorOccured'] : "An error occurred. Please try again.");
                    console.log('extraParameters');
                    console.log(extraParameters);
                    externalFailCallback(extraParameters);
                }
            }
        });
    }
}