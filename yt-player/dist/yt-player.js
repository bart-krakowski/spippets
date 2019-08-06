/*!
 * yt-player v1.0.0
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

  var COMPONENT_NAME = 'data-yt-player';
  var COMPONENT_SELECTOR = '[' + COMPONENT_NAME + ']';
  var TAG = document.createElement('script');

  var index = (function () {
    var components = document.querySelectorAll(COMPONENT_SELECTOR);

    window.addEventListener('load', function () {
      TAG.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(TAG, firstScriptTag);

      window.onYouTubeIframeAPIReady = function () {
        var _loop = function _loop(i) {
          var component = components[i];

          var elements = {
            playBtn: component.querySelector('[data-ref="yt-player[play-button]"]'),
            videoOverlay: component.querySelector('[data-ref="yt-player[overlay]"]'),
            videoFrame: component.querySelector('[data-ref="yt-player[frame]"]')
          };

          var componentId = Math.random().toString(36).substring(5);
          component.id = componentId;

          if (!isError(elements, componentId)) {
            var activeClasses = {
              overlay: elements.videoOverlay.getAttribute('data-active-class'),
              playBtn: elements.playBtn.getAttribute('data-active-class')
            };

            generateThumbnail(elements);

            var onPlayerReady = function onPlayerReady(event) {
              elements.playBtn.addEventListener('click', function (e) {
                e.preventDefault();
                elements.videoOverlay.classList.add(activeClasses.overlay);
                elements.playBtn.classList.add(activeClasses.playBtn);
              });
            };

            var onPlayerStateChange = function onPlayerStateChange(event) {
              switch (event.data) {
                case 0:
                  elements.videoOverlay.classList.remove(activeClasses.overlay);
                  elements.playBtn.classList.remove(activeClasses.playBtn);
                  break;
                case 2:
                  elements.videoOverlay.classList.remove(activeClasses.overlay);
                  elements.playBtn.classList.remove(activeClasses.playBtn);
                  break;
                default:
                  elements.videoOverlay.classList.add(activeClasses.overlay);
                  elements.playBtn.classList.add(activeClasses.playBtn);
              }
            };

            /* eslint-disable-next-line */
            var frame = new YT.Player('' + setUniqueId(elements.videoFrame), {
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });

            elements.playBtn.addEventListener('click', function (e) {
              startVideo(e, elements, frame, activeClasses);
            });
          }
        };

        for (var i = 0; i < components.length; i++) {
          _loop(i);
        }
      };
    });

    var isError = function isError(elements, componentId) {
      var error = '';
      var status = false;

      for (var key in elements) {
        if (elements[key] === null) {
          error = '[YT Player] \n Missing element: ' + key + ' (component id: "' + componentId + '")';
          status = true;
          console.error(error);
        }
      }

      return status;
    };

    var generateThumbnail = function generateThumbnail(elements) {
      /* eslint-disable-next-line */
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = elements.videoFrame.src.match(regExp);
      if (match && match[7].length === 11) {
        elements.videoOverlay.style.backgroundImage = 'url(https://img.youtube.com/vi/' + match[7] + '/maxresdefault.jpg)';
      } else {
        console.error('Invalid Youtube link');
      }
    };

    var setUniqueId = function setUniqueId(videoFrame) {
      var id = Math.random().toString(36).substring(5);
      videoFrame.id = id;

      return id;
    };

    var startVideo = function startVideo(e, elements, frame, activeClasses) {
      e.preventDefault();
      elements.videoOverlay.classList.add(activeClasses.overlay);
      elements.playBtn.classList.add(activeClasses.playBtn);
      frame.playVideo();
    };
  });

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
