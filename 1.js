
$(document).ready(function() {

    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().removeClass('active');
    });

});