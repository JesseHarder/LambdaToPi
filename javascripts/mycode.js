function performTranslation() {
    var lambdaString;
    var parserOutput;
    var piString;
    
    lambdaString = document.getElementById('input').value;
    
    parserOutput = lambdacalc.parse(lambdaString);
    
    piString = translate(parserOutput, "topP");
    
    document.getElementById('answers').innerHTML = (piString != "") ? piString : "Invalid Input String.";
    
    resetIter();
}