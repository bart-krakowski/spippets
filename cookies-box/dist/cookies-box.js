/*!
 * cookies-box v1.0.0
 * (c) 2019-2019 Tonik <hello@tonik.pl> (https://tonik.pl/)
 * Released under the MIT License.
 *
 * @author Tonik (https://tonik.pl)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Glide = {})));
}(this, (function (exports) { 'use strict';

  function getCookie(name) {
    if (document.cookie !== '') {
      var cookies = document.cookie.split(/; */);

      for (var i = 0; i < cookies.length; i++) {
        var cookieName = cookies[i].split('=')[0];
        var cookieVal = cookies[i].split('=')[1];
        if (cookieName === decodeURIComponent(name)) {
          return decodeURIComponent(cookieVal);
        }
      }
    }
  }

  function setCookie(name, val, days) {
    if (navigator.cookieEnabled) {
      var cookieName = encodeURIComponent(name);
      var cookieVal = encodeURIComponent(val);
      var cookieText = cookieName + '=' + cookieVal;

      if (typeof days === 'number') {
        var data = new Date();
        data.setTime(data.getTime() + days * 24 * 3600 * 1000);
        cookieText += '; expires=' + data.toGMTString();
      }

      document.cookie = cookieText;
    } else {
      console.error('Cookies are disabled!');
    }
  }

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
  var firstVisit = createEvent('cookies.firstVisit');

  /**
   * Another visit
   *
   * Example:
   *   el.addEventListener('cookies.anotherVisit', () => { ... })
   *
   * @type {Event}
   */
  var anotherVisit = createEvent('cookies.anotherVisit');

  /**
   * Cookies accepted
   *
   * Example:
   *   el.addEventListener('cookies.accepted', () => { ... })
   *
   * @type {Event}
   */
  var cookiesAccepted = createEvent('cookies.accepted');

  var COMPONENT_SELECTOR = '[data-cookie]';
  var CLOSE_BTN_SELECTOR = '[data-ref="cookie[close]"]';

  function index () {
    var components = document.querySelectorAll(COMPONENT_SELECTOR);

    var _loop = function _loop(i) {
      var component = components[i];
      var closeBtn = component.querySelector(CLOSE_BTN_SELECTOR);
      var activeClass = component.getAttribute('data-active-class');

      component.addEventListener('cookies.accepted', function (e) {
        component.classList.remove(activeClass);
      });

      closeBtn.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 365);
        component.dispatchEvent(cookiesAccepted);
      });

      if (getCookie('isVisited') !== 'true') {
        setCookie('isVisited', 'true', 365);
        component.dispatchEvent(firstVisit);
      } else {
        component.dispatchEvent(anotherVisit);
      }

      if (getCookie('cookiesAccepted') === 'true') {
        component.dispatchEvent(cookiesAccepted);
      }
    };

    for (var i = 0; i < components.length; i++) {
      _loop(i);
    }
  }

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
