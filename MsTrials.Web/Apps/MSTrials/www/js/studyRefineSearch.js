﻿var selectedAutorId = 0;

(function ($) {

    function pageIsSelectmenuDialog(page) {
        var isDialog = false,
            id = page && page.attr("id");

        $(".filterable-select").each(function () {
            if ($(this).attr("id") + "-dialog" === id) {
                isDialog = true;
                return false;
            }
        });

        return isDialog;
    }

$.mobile.document

        // Upon creation of the select menu, we want to make use of the fact that the ID of the
        // listview it generates starts with the ID of the select menu itself, plus the suffix "-menu".
        // We retrieve the listview and insert a search input before it.
        .on("selectmenucreate", ".filterable-select", function (event) {
            var input,
                selectmenu = $(event.target),
                list = $("#" + selectmenu.attr("id") + "-menu"),
                form = list.jqmData("filter-form");

            // We store the generated form in a variable attached to the popup so we avoid creating a
            // second form/input field when the listview is destroyed/rebuilt during a refresh.
            if (!form) {
                input = $("<input data-type='search'></input>");
                form = $("<form></form>").append(input);

                input.textinput();

                list
                    .before(form)
                    .jqmData("filter-form", form);
                form.jqmData("listview", list);
            }

            // Instantiate a filterable widget on the newly created selectmenu widget and indicate that
            // the generated input form element is to be used for the filtering.
            selectmenu
                .filterable({
                    input: input,
                    children: "> option[value]"
                })

                // Rebuild the custom select menu's list items to reflect the results of the filtering
                // done on the select menu.
                .on("filterablefilter", function () {
                    selectmenu.selectmenu("refresh");
                });
        })

        // The custom select list may show up as either a popup or a dialog, depending on how much
        // vertical room there is on the screen. If it shows up as a dialog, then the form containing
        // the filter input field must be transferred to the dialog so that the user can continue to
        // use it for filtering list items.
        .on("pagecontainerbeforeshow", function (event, data) {
            var listview, form;

            // We only handle the appearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }

            listview = data.toPage.find("ul");
            form = listview.jqmData("filter-form");

            // Attach a reference to the listview as a data item to the dialog, because during the
            // pagecontainerhide handler below the selectmenu widget will already have returned the
            // listview to the popup, so we won't be able to find it inside the dialog with a selector.
            data.toPage.jqmData("listview", listview);

            // Place the form before the listview in the dialog.
            listview.before(form);
        })

        // After the dialog is closed, the form containing the filter input is returned to the popup.
        .on("pagecontainerhide", function (event, data) {
            var listview, form;

            // We only handle the disappearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }


            /* BUG IN JQM
            listview = data.prevPage.jqmData("listview"),
            form = listview.jqmData("filter-form");

            // Put the form back in the popup. It goes ahead of the listview.
            listview.before(form);
            */
        });

})(jQuery);

$(document).on("pageinit", "#studyRefineSearchPage", function (event) {
    console.log('pageinit studyRefineSearchPage');
    loadStudyRefineSearchResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));
});

function loadStudyRefineSearchResources(resources) {
    if (resources != null) {
        $('#hRefineSearch').html(resources[langSelected]['refine']);
        $('#lMedicamento').html(resources[langSelected]['medicament']);
        $('#lIndicacion').html(resources[langSelected]['indication']);
        $('#lComparador').html(resources[langSelected]['comparator']);
        $('#lFirstAuthor').html(resources[langSelected]['firstAuthor']);
        $('#btnReset').html(resources[langSelected]['reset']);
        $('#btnOK').html(resources[langSelected]['apply']);
    }
}

$(document).on("pageshow", "#studyRefineSearchPage", function () {
    if (!OnlineTester.isOnline())
        loadStudyRefineSearchResources(JSON.parse(localStorage.getItem(resourcesStorageKey)));

    if (calledFromIndex) {
        calledFromIndex = false;

        var key = filterStorageKey + globalMode;
        var previousSelectedObject = localStorage.getItem(key) != null ? JSON.parse(localStorage.getItem(key)) : null;

        LoadMedicamentos(previousSelectedObject != null ? previousSelectedObject.medicamentoId : null);
        LoadIndicaciones(previousSelectedObject != null ? previousSelectedObject.indicacionId : null);
        LoadComparadores(previousSelectedObject != null ? previousSelectedObject.comparadorId : null);
        LoadSponsors(previousSelectedObject != null ? previousSelectedObject.sponsorId : null);
        selectedAutorId = (previousSelectedObject == null ? 0 : previousSelectedObject.primerAutorId);
        $('#autocomplete-input').val(previousSelectedObject == null ? "" : previousSelectedObject.primerAutor);

        $("#autocomplete").on("listviewbeforefilter", function (e, data) { //filterablebeforefilter
            var $ul = $(this),
                $input = $(data.input),
                value = $input.val(),
                html = "";
            $ul.html("");
            if (value && value.length > 2) {
                $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                $ul.listview("refresh");
                $.ajax({
                    url: TypeDefAsync.getApiRootUrl() + "/api/apisearch/GetArrayOfAutoresNames",
                    //contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    data: {
                        input: $input.val()
                    }
                })
                .then(function (response) {
                    $.each(response, function (i, val) {
                        html += "<li id='" + val.data + "'>" + val.value + "</li>";
                    });
                    $ul.html(html);
                    $ul.listview("refresh");
                    $ul.trigger("updatelayout");
                });
            }
        });

        $('#autocomplete').on('click', 'li', function () {
            selectedAutorId = this.id;
            $('#autocomplete-input').val($(this).text());
            $('#autocomplete').html("");
        });
    }
});

function LoadMedicamentos(selectedValueId) {
    TypeDefAsync.getMedicamentos(
        "medicamentos",
        function (result) {
            var target = $('#medicamento');
            AppendHTMLItemsToSelectTarget(result, target, selectedValueId);
        }
    );
}

function LoadIndicaciones(selectedValueId) {
    TypeDefAsync.getIndicaciones(
        "indicaciones",
        function (result) {
            var target = $('#indicacion');
            AppendHTMLItemsToSelectTarget(result, target, selectedValueId);
        }
    );
}

function LoadComparadores(selectedValueId) {
    TypeDefAsync.getComparadores(
        "comparadores",
        function (result) {
            var target = $('#comparador');
            AppendHTMLItemsToSelectTarget(result, target, selectedValueId);
        }
    );
}

function LoadSponsors(selectedValueId) {
    TypeDefAsync.getSponsors(
        "sponsors",
        function (result) {
            var target = $('#sponsor');
            AppendHTMLItemsToSelectTarget(result, target, selectedValueId);
        }
    );
}

function AppendHTMLItemsToSelectTarget(items, target, selectedValueId) {
    target.empty();
    var resources = localStorage.getItem(resourcesStorageKey) != null ? JSON.parse(localStorage.getItem(resourcesStorageKey)) : null;
    target.append($("<option></option>").attr("value", "0").text(resources[langSelected] != null ? resources[langSelected]['choose'] : "Seleccionar..."));
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.Value == selectedValueId)
            target.append($("<option selected></option>").attr("value", item.Value).text(item.Text));
        else
            target.append($("<option></option>").attr("value", item.Value).text(item.Text));
    }
    target.selectmenu("refresh",true);
    //target.listview('refresh');
}

function confirmFilters () {
    var key = filterStorageKey + globalMode;
    //alert($('#medicamento').val());
    var object = {
        medicamentoId: $('#medicamento').val(),
        indicacionId: $('#indicacion').val(),
        comparadorId: $('#comparador').val(),
        sponsorId: $('#sponsor').val(),
        primerAutorId: $('#autocomplete-input').val() == "" ? 0 : selectedAutorId,
        primerAutor: $('#autocomplete-input').val()
    };
    localStorage.setItem(key, JSON.stringify(object));
    reloadMainPage = true;
    window.history.back();
}

function resetFilters() {
    $('#medicamento').val(0);
    $('#medicamento').selectmenu("refresh", true);
    $('#indicacion').val(0);
    $('#indicacion').selectmenu("refresh", true);
    $('#comparador').val(0);
    $('#comparador').selectmenu("refresh", true);
    $('#sponsor').val(0);
    $('#sponsor').selectmenu("refresh", true);
    $('#autocomplete-input').val("");
}