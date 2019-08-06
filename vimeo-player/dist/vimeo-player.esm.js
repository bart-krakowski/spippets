/*!
 * vimeo-player v1.0.0
 * (c) 2019-2019 Tonik <hello@tonik.pl> (https://tonik.pl/)
 * Released under the MIT License.
 *
 * @author Tonik (https://tonik.pl)
 */

var COMPONENT_NAME = 'data-vimeo-player';
var COMPONENT_SELECTOR = '[' + COMPONENT_NAME + ']';
var TAG = document.createElement('script');

var index = (function () {
  var components = document.querySelectorAll(COMPONENT_SELECTOR);

  TAG.src = 'https://player.vimeo.com/api/player.js';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(TAG, firstScriptTag);

  window.addEventListener('load', function () {
    var _loop = function _loop(i) {
      var component = components[i];
      var elements = {
        playBtn: component.querySelector('[data-ref="vimeo-player[play-button]"]'),
        videoOverlay: component.querySelector('[data-ref="vimeo-player[overlay]"]'),
        videoFrame: component.querySelector('[data-ref="vimeo-player[frame]"]')
      };
      var componentId = Math.random().toString(36).substring(5);
      component.id = componentId;
      /* eslint-disable-next-line */
      var frame = new Vimeo.Player(elements.videoFrame);

      var error = '';
      for (var key in elements) {
        if (elements[key] === null) {
          error = '[Vimeo Player] \n Missing element: ' + key + ' (component id: "' + componentId + '")';
          console.error(error);
        }
      }

      if (!error) {
        var activeClasses = {
          overlay: elements.videoOverlay.getAttribute('data-active-class'),
          playBtn: elements.playBtn.getAttribute('data-active-class')

          /* eslint-disable-next-line */
        };var regExp = /(http|https)?:\/\/(www\.)?(player.)?vimeo.com\/(?:video\/)(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)*/;
        var match = elements.videoFrame.src.match(regExp);

        if (match && match[5].length === 8) {
          var url = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + match[5];

          var param = { postId: 1 };
          new Promise(function (resolve, reject) {
            var qs = param ? '?' + Object.entries(param).map(function (d) {
              return d[0] + '=' + d[1];
            }).join('&') : '';
            /* eslint-disable-next-line */
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '' + url + qs);

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 400) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                resolve(xhr.responseText);
              }
            };
            xhr.onerror = function () {
              return reject(xhr.statusText);
            };
            xhr.send();
          }).then(function (data) {
            elements.videoOverlay.style.backgroundImage = 'url(' + data.thumbnail_url + ')';
          });
        } else {
          console.error('Invalid Vimeo link');
        }

        elements.playBtn.addEventListener('click', function (e) {
          e.preventDefault();

          elements.videoOverlay.classList.add(activeClasses.overlay);
          elements.playBtn.classList.add(activeClasses.playBtn);
          frame.play();
        });

        frame.on('pause', function () {
          showOverlay(elements, activeClasses);
        });

        frame.on('ended', function () {
          showOverlay(elements, activeClasses);
        });
      }
    };

    for (var i = 0; i < components.length; i++) {
      _loop(i);
    }
  });
});

function showOverlay(elements, activeClasses) {
  elements.videoOverlay.classList.remove(activeClasses.overlay);
  elements.playBtn.classList.remove(activeClasses.playBtn);
}

export default index;
