# Pie chart
## HTML Structure

```html
<svg class="chart" data-pie-chart>
  <circle
      class="chart__progress-ring chart__progress-ring--background"
      r="48"
      cx="51"
      cy="51"
      data-value="100"
    ></circle>
  <circle
      class="chart__progress-ring"
      r="48"
      cx="51"
      cy="51"
      data-value="28,2%"
    ></circle>
</svg>
```

## SCSS Styles
```css
.chart {
    position: relative;
    left: 0;
    transform: none;
    width: 102px;
    height: 102px;

  &__progress-ring {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: green;
    stroke-width: 5px;
    fill: transparent;

    &--background {
      stroke: red
    }
  }
}
```

### Notices
- ```data-value``` attribute attribute accepts percentages
