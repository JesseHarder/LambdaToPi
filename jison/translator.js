

var iter = 0; /* global variable to keep track of iterations and be used for channel naming */


/* Function Name: newChannel
 * Return Value: a string for a new channel not yet used.
 *
 * Jesse's note: This function is an alternative idea I had. Not necessarily needed.
 */

/* function newChannel () {
    var channel = "chan".concat(iter.toString());
    iter++;
    return channel;
}*/

/* Function Name: translate
 * Input Parameters: (expr, chan), takes parser output array, and optional channel name
 * Return Value: A string corrsponding to the pi calculus translation of the input.
 */

function translate (expr, chan) {
    iter++;
    if (chan === undefined) chan = "chanP";
    /* else chan = chan.concat(iter); }   not sure about this */
    
    var testvalue = expr[0]; /* first element of the input array */
    var varname;
    
    switch (testvalue) {
            
        /* If it is a variable:
         * expr is an array containing two elements:
         *  0) The string "VarExpr".
         *  1) The name of the variable as a string.
         *  Example: ["VarExpr", varname ]
         *
         * Return: varname!chan;
         * if channel input is provided, it is passed to chan, if not, it is returned as chan default
         */
    
        case "VarExpr":
            varname = expr[1]; /* second element of the input array */
            return varname.concat("!", chan);
            
        
            
        /* if it is a lambda expression aka function
         * expr is an array containing three elements:
         *  0) The string "LambdaExpr".
         *  1) The name of the variable as a string.
         *  2) A sub-expression.
         *  Example: ["LambdaExpr", varname, expr]
         *
         * Return: chan?varname.chan?chanQ.translate(childexpr, chanQ);
         * need a recursive call to translate the inner expression
         */
            
        case "LambdaExpr":
            varname = expr[1]; /* second element of the input array */
            var childexpr = expr[2]; /* third element of the input array */
            return chan.concat("?", varname, " . ", chan, "?", ("chanQ").concat(iter), " . ", translate(childexpr, ("chanQ").concat(iter)));
            
        
            
        /* if it is an application, return
         * expr is an array containing three elements:
         *  0) The string "ApplyExpr".
         *  1) The first expression.
         *  2) The second expression. The one being applied to the first.
         *  Example: ["ApplyExpr", expr1, expr2]
         *
         * Return: new(chanA).new(chanB).(translate([expr1],(chanA))|(chanA!chanB.chanA!chan)|*((chanB?chanC).translate([expr2],(chanC)));
         *
         * Two recursive calls needed to translate the two expressions.
         */
            
        case "ApplyExpr":
            var expr1 = expr[1]; /* second element of the input array */
            var expr2 = expr[2]; /* third element of the input array */
            /* chanA and chanB should also be concatenated with iter */
            return ( "new(chanA).new(chanB) . (" ).concat(translate([expr1], "chanA"), " | (chanA!chanB . chanA!", chan , ") | *(( chanB?chanC . ", translate([expr2], "chanC"), ")");
            }
}