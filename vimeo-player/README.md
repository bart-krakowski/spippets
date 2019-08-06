# Vimeo Player
## HTML Structure

```html
 <div data-vimeo-player>
    <button data-ref="vimeo-player[play-button]" data-active-class="video__play-btn--active">
    </button>
    <div class="video__video-wrapper">
      <div data-ref="vimeo-player[overlay]" data-active-class="video__overlay--active"></div>
      <iframe data-ref="vimeo-player[frame]" class="video__iframe" src="<insert-vimeo-video-link-here>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
    </div>
  </div>
```

### Notices
- ```id``` attribute for general component is generated automatically (info on error is available in console bug catching)
- placeholder image for ```data-ref="vimeo-player[overlay]"``` is generated automatically