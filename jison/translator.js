

var iter = 0; /* global variable to keep track of iterations and be used for channel naming */


/* Function Name: newChannel
 * Return Value: a string for a new channel not yet used.
 */

function newChannel () {
    var channel = "p".concat(iter.toString())
    return channel;
}

/* Function Name: translate
 * Input Parameters: (expr, chan), takes parser output array, and optional channel name
 *
 * An expression is an array output by the parser with three elements inside of it:
 *      1) A string identifying the type of expression.
 *      2)
 *      3)
 *
 * Return Value: A string corrsponding to the pi calculus translation of the input.
 */

function translate (expr, chan) {
    iter++;
    if (chan === undefined) chan = "chanP";
    /* else chan = chan.concat(iter); }   not sure about this */
    
    var testvalue = expr[0]; /* first element of the input array */
    var varname;
    
    switch ( testvalue {
            
    /* if it is a variable */
            case “VarExpr”:
            varname = expr[1]; /* second element of the input array */
            return varname.concat(“!”, chan);
            
    /* return varname!chan; */
    /* if channel input is provided, it is passed to chan, if not, it is returned as chan default*/
    /* parsed value will be [“VarExpr”, varname ] */
            
    /* if it is a lambda expression aka function */
            case “LambdaExpr”:
            varname = expr[1]; /* second element of the input array */
            var childexpr = expr[2]; /* third element of the input array */
            return chan.concat(“?”, varname, ”.”, chan, ”?”, (“chanQ”).concat(iter), ”.”, LambdatoPITranslator(childexpr, (“chanQ”).concat(iter)));
            
    /* chan?varname.chan?chanQ.LambdatoPITranslator(childexpr, chanQ); */
    /* need a recursive call to translate the inner expression*/
    /* parsed value will be [“LambdaExpr”, varname, expr] */
            
    /* if it is an application, return */
            case “ApplyExpr”:
            var expr1 = expr[1]; /* second element of the input array */
            var expr2 = expr[2]; /* third element of the input array */
            /* chanA and chanB should also be concatenated with iter */
            return ( “new(chanA).new(chanB).(” ).concat(LambdatoPITranslator([expr1], chanA), “| (chanA!chanB.chanA!”, chan, “)|*(( chanB?chanC.”, LambdatoPITranslator([expr2], chanC), “)”);
    /* new(chanA).new(chanB).(LambdatoPITranslator([expr1],(chanA))|(chanA!chanB.chanA!chan)|*((chanB?chanC).LambdatoPITranslator([expr2],(chanC))); */
                                                        /* parsed value will be [“ApplyExpr”, expr1, expr2] */
                                                        }
                                                        }