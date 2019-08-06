/*!
 * lazy-loading v1.0.0
 * (c) 2019-2019 Tonik <hello@tonik.pl> (https://tonik.pl/)
 * Released under the MIT License.
 *
 * @author Tonik (https://tonik.pl)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('intersection-observer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'intersection-observer'], factory) :
  (factory((global.Glide = {})));
}(this, (function (exports) { 'use strict';

  // eslint-disable-next-line
  IntersectionObserver.prototype.POLL_INTERVAL = 100;

  var COMPONENT_SELECTOR = '[data-lazy]';

  var images = document.querySelectorAll(COMPONENT_SELECTOR);
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  var index = (function () {
    // eslint-disable-next-line
    var observer = new IntersectionObserver(handleIntersect, options);

    function handleIntersect(entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0) {
          var img = entry.target.getAttribute('data-src');
          entry.target.src = img;
        }
      });
    }

    for (var i = 0; i < images.length; i++) {
      observer.observe(images[i]);
    }
  });

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
