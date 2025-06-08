// https://www.99-bottles-of-beer.net/lyrics.html

var numOfBottles = 99;

while (numOfBottles >= 0)
{
    console.log(numOfBottles + " bottles of beer on the wall, " + numOfBottles + " bottles of beer.");
    numOfBottles--;
    if (numOfBottles > 0)
    {
        console.log("Take one down and pass it around, " + numOfBottles + " bottles of beer on the wall.");
    }
    else
    {
        console.log("Take one down and pass it around, no more bottles of beer on the wall.");
    }
}

console.log("No more bottles of beer on the wall, no more bottles of beer.");
console.log("Go to the store and buy some more, 99 bottles of beer on the wall.");