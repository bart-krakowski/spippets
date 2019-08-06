(function () {
'use strict';

/**
 * Creates a custom DOM event.
 *
 * @param  {String} name
 * @return {Event}
 */
function createEvent(name) {
  var event = document.createEvent('Event');

  event.initEvent(name, true, true);

  return event;
}

/**
 * First visit
 *
 * Example:
 *   el.addEventListener('cookies.firstVisit', () => { ... })
 *
 * @type {Event}
 */
var itemExpanded = createEvent('expander.expanded');

/**
 * Another visit
 *
 * Example:
 *   el.addEventListener('cookies.anotherVisit', () => { ... })
 *
 * @type {Event}
 */
var itemCollapsed = createEvent('expander.collapsed');

/**
 * Collection of all cookies events.
 *
 * @type {Event[]}
 */

var COMPONENT_NAME = 'data-expander';
var COMPONENT_SELECTOR = '[' + COMPONENT_NAME + ']';

var expander = (function () {
  var components = document.querySelectorAll(COMPONENT_SELECTOR);

  var _loop = function _loop(i) {
    var component = components[i];
    var activeClasses = JSON.parse(decodeURIComponent(component.getAttribute('data-active-classes')));
    var componentItems = component.querySelectorAll('[data-ref="expander[item]"]');

    if (!isComponentError(componentItems)) {
      var _loop2 = function _loop2(j) {
        var componentItem = componentItems[j];

        var elements = {
          header: componentItem.querySelector('[data-ref="expander[header]"]'),
          body: componentItem.querySelector('[data-ref="expander[body]"]')
        };

        if (!isItemError(elements)) {
          elements.header.addEventListener('click', function () {
            var _loop3 = function _loop3(k) {
              componentItems[k].addEventListener('expander.collapsed', function (e) {
                itemCollapse(componentItems[k], activeClasses);
              });
              componentItems[k].addEventListener('expander.expanded', function (e) {
                itemExpand(componentItems[k], activeClasses);
              });

              if (componentItems[k] !== componentItem && componentItems[k].getAttribute('aria-expanded') === 'true') {
                componentItems[k].dispatchEvent(itemCollapsed);
              }
            };

            for (var k = 0; k < componentItems.length; k++) {
              _loop3(k);
            }

            if (componentItem.getAttribute('aria-expanded') === 'false') {
              componentItem.dispatchEvent(itemExpanded);
            } else {
              componentItem.dispatchEvent(itemCollapsed);
            }
          });
        }
      };

      for (var j = 0; j < componentItems.length; j++) {
        _loop2(j);
      }
    }
  };

  for (var i = 0; i < components.length; i++) {
    _loop(i);
  }
});

var isComponentError = function isComponentError(elements) {
  var error = '';
  var status = false;

  if (!elements.length) {
    error = '[Expander] \n At least one item required.';
    status = true;
    console.error(error);
  }

  return status;
};

var isItemError = function isItemError(elements) {
  var error = '';
  var status = false;

  for (var key in elements) {
    if (elements[key] === null) {
      error = '[Expander] \n Missing element: ' + key;
      status = true;
      console.error(error);
    }
  }

  return status;
};

var itemCollapse = function itemCollapse(item, activeClasses) {
  console.log(item);
  item.setAttribute('aria-expanded', false);
  item.querySelector('[data-ref="expander[header]"]').classList.remove(activeClasses.header);
  item.querySelector('[data-ref="expander[body]"]').classList.remove(activeClasses.body);
};

var itemExpand = function itemExpand(item, activeClasses) {
  console.log(item);
  item.setAttribute('aria-expanded', true);
  item.querySelector('[data-ref="expander[header]"]').classList.add(activeClasses.header);
  item.querySelector('[data-ref="expander[body]"]').classList.add(activeClasses.body);
};

expander();

}());
