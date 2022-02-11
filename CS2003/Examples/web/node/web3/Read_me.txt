Please read the examples in this order:

1. list-nonlambda.js

		An example of first class functions using a named function.
		This example also shows a function from the List prototype being used.
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype


2. list-lamba.js

		This is essentially the same example as above using anonymous (lambda) functions.
		
3. raw_object.js

		This example creates a new person object using the { attr : value} syntax.
		Also shows how objects can be modified to add new attributes and to delete them.

4. objects.js

		This example creates similar objects to above using a function as a constructor.
		It also changes what fields are available by assigning to the prototype object
			
			
5. objects2.js

		Like the example above but assigns a function (get_age) to the prototype which is then called.


6. objects3.js

		Similar to the above examples but performs some introspection of the prototype object.


7. class.js	

		The same example using class objects and also illustrates the use of computed properties.
		
8. this.js

		Some examples showing how the this keyword binds.