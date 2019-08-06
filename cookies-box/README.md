# Cookies box

## HTML Structure

```html
<div class="cookies-box cookies-box--visible" data-cookie data-active-class="cookies-box--visible">
    <button data-ref="cookie[close]">X</button>
</div>
```

## Custom events
- first visit
```js
el.addEventListener('cookies.firstVisit', () => { ... })
```

- another visit
```js
el.addEventListener('cookies.anotherVisit', () => { ... })
```

- cookie accepted
```js
el.addEventListener('cookies.accepted', () => { ... })
```