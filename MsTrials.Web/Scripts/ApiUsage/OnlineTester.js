var OnlineTester = new function () {
    var me = this;

    me.checkInternetConnectivity = function (onlineAgainHandler, offlineHandler) {
        var file = window.location.origin + "/Images/blank.png";
        var randomNum = Math.round(Math.random() * 10000);

        var xhr = new XMLHttpRequest();

        xhr.open('HEAD', file + "?rand=" + randomNum, true);

        try {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4){
                    if(xhr.status >= 200 && xhr.status < 304) {
                        var wasOffline = (localStorage.getItem('offlineMode') == 1);
                        localStorage.setItem('offlineMode', 0);
                        if (wasOffline)
                            onlineAgainHandler();
                    } else {
                        if (xhr.status == 404 || xhr.status == 500) {
                            localStorage.setItem('offlineMode', 1);
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
        return localStorage.getItem('offlineMode') == undefined || localStorage.getItem('offlineMode') == null || localStorage.getItem('offlineMode') == 0;
    }
}