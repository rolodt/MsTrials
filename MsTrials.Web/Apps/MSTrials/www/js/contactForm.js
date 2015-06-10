$(document).on("pageinit", "#contactPage", function (event) {
    loadContactResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
});

$(document).on("pageshow", "#contactPage", function (event) {
    if(!OnlineTester.isOnline())
        loadContactResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
});

function loadContactResources(resources) {
    if (resources != null) {
        $('#aContact3').html(resources[langSelected]['contact']);
        $('#header').html(resources[langSelected]['contact']);
        $('#aStudies3').html(resources[langSelected]['studies']);
        $('#lName').html(resources[langSelected]['name']);
        $('#lEmail').html(resources[langSelected]['email']);
        $('#lSubject').html(resources[langSelected]['subject']);
        $('#sendEmail').html(resources[langSelected]['sendButton']);
    }
}

$(document).on('submit', '#myForm', function (e) {

    var resources = JSON.parse(localStorage.getItem(resourcesStorageKey));
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test($('#email').val())) {
        alert((localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['wrongAddress'] : 'Por favor ingrese una dirección válida.'));
        return false;
    }

    //avoid submitting
    e.preventDefault();

    showLoadingSpinner();

    TypeDefAsync.sendEmail({ subject: $('#subject').val(), name: $('#name').val(), email: $('#email').val() },
        function (result) {
            $.mobile.loading('hide');
            var target = $("#results");
            target.empty();
            target.append('<h3>' + (localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey))[langSelected]['contactSucceed'] : 'Se ha enviado exitosamente!') + '</h3>');
        },
        function (error) {
            $.mobile.loading('hide');
            var target = $("#results");
            target.empty();
            target.append('<h3 class="text-error">' + error.errorMsg + '</h3>');
        }
    )
});

/*function gotoIndex() {
    window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
}*/