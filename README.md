# LambdaToPi
A web application that can be used to translate a lambda calculus expression into an equivalent pi calculus expression.

The translator converts Lambda Calculus Expressions to Pi Calculus Expressions based on the following model:
Grammar Element 	Lambda Input 	Pi Output
term: 	M 	[M](p)
variable: 	x 	x!p
expression: 	λx M 	p?x.p?q.[M](q)
application: 	M N 	[M N](p) = new(a).new(b).(([M](a))|(a!b.a!p)|*((b?c).[N](c))

The translator will accept either the lambda character 'λ' or the carat '^' interchangeably.
Abbrevated lambda format is suppoted (eg. λxyz.x y z vs λxλyλz.x y z).
Parentheses are supported.
Input Lambda expression MUST use dot notation.