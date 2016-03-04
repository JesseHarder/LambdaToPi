
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   	/* skip whitespace */
[a-z][a-z0-9]\b	      	return 'NUMBER'
"\"		      	return 'LAMBDA' /* We'll use '\' for lambda. */
"("                   	return '('
")"                   	return ')'
"."			return '.'
<<EOF>>               	return 'EOF'
.                     	return 'INVALID'

/lex

/* operator associations and precedence */

%left '.' '-'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;

