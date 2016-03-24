var contentController = (function($) {
    var $listItems;

    function onDocumentReady() {
        $listItems = $('li');

        $listItems.wrapInner('<span />');
    }

    $(onDocumentReady);

})(jQuery);
