
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   	/* skip whitespace */
[a-z][a-zA-Z0-9]*\b	    return 'VARIABLE'
"\"		      			return 'LAMBDA' /* We'll use '\' for lambda. */
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

top_level
	: expression EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }

expression
	: variable
		{$$ = $1}
	| function
		{$$ = $1}
	| application
		{$$ = $1}

function
	: 'LAMBDA' variable '.' scope
		{}

application
	: '('func_expr arg_expr')'
		{}

scope
	: expression
		{$$ = $1}

func_expr
	: expression
		{$$ = $1}

arg_expr
	: expression
		{$$ = $1}

variable
	: VARIABLE
		{$$ = yytext}
