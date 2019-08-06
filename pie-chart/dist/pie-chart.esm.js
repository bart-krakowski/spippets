/*!
 * pie-chart v1.0.0
 * (c) 2019-2019 Tonik <hello@tonik.pl> (https://tonik.pl/)
 * Released under the MIT License.
 *
 * @author Tonik (https://tonik.pl)
 */

var COMPONENT_NAME = 'data-pie-chart';
var COMPONENT_SELECTOR = '[' + COMPONENT_NAME + ']';

var index = (function () {
  var components = document.querySelectorAll(COMPONENT_SELECTOR);

  for (var i = 0; i < components.length; i++) {
    var component = components[i];
    var rings = component.querySelectorAll('circle');

    rings.forEach(function (ring) {
      var value = changeTextPercentToNumber(ring.dataset.value);
      var radius = ring.r.baseVal.value;
      var circumference = radius * 2 * Math.PI;

      ring.style.strokeDasharray = circumference + ' ' + circumference;
      ring.style.strokeDashoffset = '' + circumference;

      var offset = circumference - value / 100 * circumference;
      ring.style.strokeDashoffset = offset;
    });
  }

  function changeTextPercentToNumber(str) {
    return str.replace('%', '').replace(',', '.');
  }
});

export default index;
