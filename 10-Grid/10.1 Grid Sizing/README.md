My solution for exercise in test.html

```css
/* Write your CSS code below to make the purple items size, grow and shrink like the green ones.*/

.grid-container {
 display: grid;
 grid-template-rows: 1fr 1fr 2fr;
 grid-template-columns: auto 400px minmax(200px, 500px);
 grid-auto-rows: 50px;
}
```