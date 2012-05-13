/*! Google Map Thumb - v1.0. - 2012-05-13
*   Created By: Imran Baloch
*   Imran Baloch's Blog: http://weblogs.asp.net/imranbaloch */
(function ($) {
    $.fn.gmapthumb = function (maps) {
        var popup,
            gMapThumb,
            gMapImage;
        return this.each(function (index, el) {
            var map = maps[index];
            if (!map || !(map instanceof google.maps.Map))
                throw new Error("google.maps.Map object not found");
            var mapContainer = $(this),
                hoveredElement;
            mapContainer.delegate('div div div div div', 'mouseover', function (event) {
                var matchedElement,
                    currentElement = $(this),
                    currentElementPosition = currentElement.position(),
                    imagesContainer = $('div:has(>img[src*="googleapis.com"])');
                hoveredElement = undefined;
                if (imagesContainer.length === 0)
                    return;
                imagesContainer.each(function () {
                    var imagePosition = $(this).position();
                    if (imagePosition.left === currentElementPosition.left && imagePosition.top === currentElementPosition.top) {
                        matchedElement = this;
                        return false;
                    }
                });
                if (matchedElement && ($('img', matchedElement).width() === 256)) {
                    hoveredElement = matchedElement;
                    showPopup();
                    setPopupPosition(event, hoveredElement);
                }
                stopPropagation(event);
            });
            mapContainer.delegate('div div div div div', 'mousemove', function (event) {
                if (!hoveredElement) {
                    $(this).trigger('mouseover');
                    return;
                }
                setPopupPosition(event, hoveredElement);
                stopPropagation(event);
            });
            google.maps.event.addListener(map, 'mouseout', function () {
                hidePopup();
            });
        });
        function appendPopupInBody() {
            if ($('.gMapPopup').length === 0)
                $('body').append('<div style="position: absolute;" class="gMapPopup"><img class="gMapImage" style="border: 5px solid #6d6d6d;" /><img class="gMapThumb" src="img/pointer.png" style="position: absolute;" /></div>');
            popup = $('.gMapPopup');
            gMapThumb = $('.gMapThumb');
            gMapImage = $('.gMapImage');
        };
        function setPopupPosition(event, hoveredElement) {
            var thumbImagePosition = getMousePosition(hoveredElement, event),
                mousePosition = getMousePosition(document.body, event),
                src = $('img', hoveredElement).attr('src');
            gMapImage.attr('src', src);
            popup.css('left', (mousePosition.x + 30 * 1) + 'px');
            popup.css('top', (mousePosition.y + 30 * 1) + 'px');
            gMapThumb.css('left', thumbImagePosition.x - 2 * 1 + 'px');
            gMapThumb.css('top', thumbImagePosition.y - 12 * 1 + 'px');
        };
        function getMousePosition(element, event) {
            var $element = $(element),
                elementPosition = $element.offset(),
                mousePosition = {},
                borderLeftWidth = $element.css('borderLeftWidth'),
                borderTopWidth = $element.css('borderTopWidth'),
                paddingTop = $element.css('paddingTop'),
                paddingLeft = $element.css('paddingLeft');
            mousePosition.x = event.pageX - elementPosition.left + parseInt(isNaN(paddingLeft) ? 0 : paddingLeft, 10) + parseInt(isNaN(borderLeftWidth) ? 0 : borderLeftWidth, 10);
            mousePosition.y = event.pageY - elementPosition.top + parseInt(isNaN(paddingTop) ? 0 : paddingTop, 10) + parseInt(isNaN(borderTopWidth) ? 0 : borderTopWidth, 10);
            return mousePosition;
        };
        function hidePopup() {
            if (!popup)
                return;
            popup.fadeOut('slow', function () {
                popup.css('display', 'none');
            });
        };
        function showPopup() {
            if (!popup)
                appendPopupInBody();
            popup.fadeIn('slow', function () {
                popup.css('display', 'block');
            });
        };
        function stopPropagation(event) {
            event.stopPropagation();
            if (event.cancelBubble)
                event.cancelBubble = true;
        };
    };
})(jQuery);