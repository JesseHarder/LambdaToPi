/* Function: performTranslation
 * 
 * This function is called to take the contents of the input field,
 * run it through the translator, and update the page's output
 * with the corresponding translation or error report.
 *
 */

/* var inent = document.getElementById("input");
inent.addEventListener("keydown", function(e){
                     if( e.keyCode ===13) { performTranslation();
                     }
                }) */

function performTranslation() {
    
    var lambdaString = "";
    var parserOutput = [];
    var piString;
    
    var inputField = document.getElementById('input');
    var outputField = document.getElementById('answers');
    
    lambdaString = inputField.value;
    
    if (lambdaString == "") {
        outputField.innerHTML = "Please enter a valid lambda expression before clicking Translate.";
    } else {
        try {
            parserOutput = lambdacalc.parse(lambdaString);
            
            piString = translate(parserOutput, "topP");
            
            outputField.innerHTML = (piString != "") ? piString : "Invalid Input String.";
            
            resetIter();
        } catch (err) {
            var message = "Invalid Input. " + err.message;
            outputField.innerHTML = message;
        }
    }
    
}