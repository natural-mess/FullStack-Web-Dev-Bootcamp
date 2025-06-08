function isLeap(year) {
    
/**************Don't change the code above****************/    
    
    //Write your code here. 
    var ret;
    if (year % 4 !== 0)
    {
        ret = "Not leap year."
    }
    else
    {
        if (year % 100 !== 0)
        {
            ret = "Leap year."
        }
        else
        {
            if (year % 400 === 0)
            {
                ret = "Leap year."
            }
            else
            {
                ret = "Not leap year."
            }
        }
    }

    return ret;

/**************Don't change the code below****************/    

}