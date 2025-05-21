Exercise can be done online via this website: https://appbrewery.github.io/flexbox-sizing-exercise/

My solution:

```css
/* Write your CSS code below to make the blue items size, grow and shrink like the green ones.*/

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
  
.container > * {
  
}

.item1 {
  flex: 0 1 200px;
  max-width: 200px;
}

.item2 {
  flex: 0 0 200px;
  max-width: 200px;
}

.item3 {
  flex: 0 0 400px;
  max-width: 400px;
}

```