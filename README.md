# LambdaToPi
A web application that can be used to translate a lambda calculus expression into an equivalent pi calculus expression based on the following model:

Grammar Element 	Lambda Input 	Pi Output
term: 	            M           	[M](p)
variable: 	        x 	            x!p
expression: 	    λx M 	        p?x.p?q.[M](q)
application:      	M N 	        [M N](p) = new(a).new(b).(([M](a))|(a!b.a!p)|*((b?c).[N](c))

The translator will accept either the lambda character 'λ' or the carat '^' interchangeably.
Abbrevated lambda format is suppoted (eg. λxyz.x y z vs λxλyλz.x y z).
Parentheses are supported.
Input Lambda expression MUST use dot notation.

Note: The output includes added spaces for improved legibility. Spaces are not specially defined in the Pi grammar.


Translation Example: Convert (λx.x) y to Pi

In simple Pi, using the model described above, the translation is:
[M N](p) = new(a) . new(b) . ( a?x . a?q . x!q | a!b . a!p | *( b?c . y!c ))

The translator produces:
new(chanA1) . new(chanB1) . (chanA1?x . chanA1?chanQ2 . x!chanQ2 | chanA1!chanB1 . chanA1!topP | *( chanB1?chanC1 . y!chanC1))


Translation Example: Convert the K combinator λx.(λy. x) to Pi

In simple Pi, using the model described above, the translation is:
[M N](p) = p?x . p?q . q?y . q?s . x!s

The translator produces:
topP?x . topP?chanQ1 . chanQ1?y . chanQ1?chanQ2 . x!chanQ2


Note: Spaces do matter in the lambda expression input.
^x.xy will return a parse error.
^x.x y will parse appropriately: ["LambdaExpr","x",["ApplyExpr",["VarExpr","x"],["VarExpr","y"]]]
and return: topP?x . topP?chanQ1 . new(chanA2) . new(chanB2) . (x!chanA2 | chanA2!chanB2 . chanA2!chanQ1 | *( chanB2?chanC2 . y!chanC2)) ^x.(x y) will parse and return the same.

(^x.x)y will return a parse error.
(^x.x) y will parse appropreately: ["ApplyExpr",["LambdaExpr","x",["VarExpr","x"]],["VarExpr","y"]]
and return: new(chanA1) . new(chanB1) . (chanA1?x . chanA1?chanQ2 . x!chanQ2 | chanA1!chanB1 . chanA1!topP | *( chanB1?chanC1 . y!chanC1))



Lambda to Pi Translator by Tatiana Petkova and Jesse Harder, Copyright 2016, Santa Clara University.
This Translator uses the Jison Javascript Parser Generator and it's Lambda Calculus sample grammar, by Zach Carter, Copyright 2009-2013. MIT Licensed. www.jison.org/

