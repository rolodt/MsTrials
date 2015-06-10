var OnlineTester = new function () {
    var me = this;

    me.checkInternetConnectivity = function (onlineAgainHandler, offlineHandler) {
        var file = TypeDefAsync.getApiRootUrl() + "/Images/blank.png";
        var randomNum = Math.round(Math.random() * 10000);

        var xhr = new XMLHttpRequest();

        xhr.open('HEAD', file + "?rand=" + randomNum, true);

        try {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 304) {
                        var wasOffline = (localStorage.getItem(offlineModeStorageKey) == 1);
                        localStorage.setItem(offlineModeStorageKey, 0);
                        if (wasOffline)
                            onlineAgainHandler();
                    } else {
                        if (xhr.status == 404 || xhr.status == 500 || xhr.status == 0) {
                            console.log('offline');
                            localStorage.setItem(offlineModeStorageKey, 1);
                            offlineHandler();
                        }
                    }
                }
            }

            xhr.send();

        } catch (e) {
            return false;
        }
    };

    me.isOnline = function () {
        return localStorage.getItem(offlineModeStorageKey) == undefined || localStorage.getItem(offlineModeStorageKey) == null || localStorage.getItem(offlineModeStorageKey) == 0;
    }

}