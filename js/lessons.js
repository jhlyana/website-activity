/* Educational content is kept separate from application behavior. */
window.BLOOM = (() => {
  const topics = [
    {id:'variables', title:'Variables', icon:'🌱', color:'sage', description:'Give your ideas a place to grow. Store values and discover data types.'},
    {id:'objects', title:'Objects', icon:'🌸', color:'pink', description:'Bring related details together with properties and methods.'},
    {id:'arrays', title:'Arrays', icon:'🍃', color:'blue', description:'Keep collections organized and make room for something new.'},
    {id:'functions', title:'Functions', icon:'☀️', color:'peach', description:'Turn useful steps into reusable little pieces of magic.'}
  ];
  const lessons = [];
  function add(topic, slug, title, objective, explanation, analogy, code, output, walkthrough, tip, terms) {
    lessons.push({id:topic+'-'+slug, topic, title, objective, explanation, analogy, code, output, walkthrough, tip, terms});
  }
  add('variables','intro','What are variables?', 'Declare a variable and read its value.',
    'A variable is a named binding to a value. JavaScript uses values such as text and numbers to represent information. Declare a binding with let or const, give it a descriptive name, and use = to assign a value. JavaScript is case-sensitive: student and Student are different names.',
    'Imagine a labeled plant pot. The label is the variable name; the plant inside is the value. Reading the label helps you find the right information.',
    'let studentName = "Mia";\nlet age = 20;\nconsole.log(studentName);\nconsole.log(age);', 'Mia\n20',
    'The first two lines store a string and a number. console.log reads each binding and prints its current value. Quotation marks identify text; they are not part of the printed text.',
    'Use meaningful names such as studentName. Names cannot start with a digit, contain spaces, or be reserved words such as return.', 'declaration binding name age string number');
  add('variables','analogy','Variables in everyday life', 'Update a value and distinguish assignment from comparison.',
    'A let binding can be reassigned. An expression combines values and operators to produce a result. The + operator adds numbers, but it also joins text. Template literals use backticks and ${...} to insert an expression into a string.',
    'A garden sign records how many flowers are planted. After planting more, you update the number on the same sign instead of making a new sign.',
    'let flowers = 3;\nflowers = flowers + 2;\nconsole.log(`The garden has ${flowers} flowers.`);\nconsole.log(flowers === 5);', 'The garden has 5 flowers.\ntrue',
    'The assignment calculates 3 + 2 before storing 5 in flowers. The template inserts 5 into the sentence. === compares values without converting their types and produces a boolean.',
    '= assigns a value; === compares values. Also, "3" + 2 produces "32" because one operand is text.', 'assignment reassignment template literals equality operators');
  add('variables','types','var, let, const & data types', 'Choose a declaration and recognize JavaScript data types.',
    'Prefer const when you will not reassign a binding and let when you will. Both are block-scoped: a binding declared inside { } belongs to that block. The older var is function-scoped (or global outside a function), allows redeclaration, and can be read as undefined before its declaration. let and const cannot be accessed before initialization. These declaration keywords are not data types. JavaScript has seven primitive types: string, number, boolean, undefined, null, bigint, and symbol. Objects are the non-primitive type; arrays and functions are special kinds of objects. A binding can later hold a value of a different type.',
    'const is a permanent label attached to one pot; let lets you move the label to another pot. An object inside a const binding can still change its contents.',
    'var oldLabel = "rose";\nlet count = 4;\nconst garden = "Bloom";\nlet unplanted;\nconsole.log(typeof oldLabel);\nconsole.log(typeof count);\nconsole.log(typeof true);\nconsole.log(typeof unplanted);\nconsole.log(typeof null);\nconsole.log(typeof 12n);\nconsole.log(typeof Symbol("seed"));', 'string\nnumber\nboolean\nundefined\nobject\nbigint\nsymbol',
    'typeof reports a value’s type as text. An uninitialized let has the value undefined. null represents intentional absence; typeof null returning "object" is a historical JavaScript quirk, not proof that null is an object. BigInt represents integers beyond the usual number precision range; symbols provide unique identifiers.',
    'const requires an initial value and prevents reassignment, not mutation. Number includes decimals and NaN. Avoid var in new beginner code when block scope is intended.', 'var let const scope primitive typeof null undefined bigint symbol boolean');
  add('variables','code','Try it: a student profile', 'Combine variables into a useful output.',
    'A small profile combines constant information and a value that may change. You can use arithmetic to update an age, then display a sentence with a template literal. Run this example, change the student name, and run it again.',
    'A student ID card has a name and age. Your program is a tiny digital card that can calculate the age next year.',
    'const studentName = "Amara";\nlet age = 19;\nconsole.log(`Student: ${studentName}`);\nconsole.log(`Age: ${age}`);\nage += 1;\nconsole.log(`Next year: ${age}`);', 'Student: Amara\nAge: 19\nNext year: 20',
    'studentName never needs reassignment, so const fits. age += 1 is shorthand for age = age + 1. Each console.log sends a new line to the playground output.',
    'Try changing age to 21. Keep it as a number: "19" + 1 joins text and becomes "191".', 'execute profile console arithmetic');
  add('objects','intro','What are objects?', 'Create an object and access its properties.',
    'An object groups related values into properties. A property has a key and a value, separated by a colon in an object literal. Properties are separated with commas. Dot notation accesses a known key; bracket notation can use a string or a variable holding the key.',
    'A flower care card keeps the name, color, and watering schedule together instead of scattering separate notes around your desk.',
    'const flower = { name: "Rose", color: "pink", petals: 12 };\nconsole.log(flower.name);\nconsole.log(flower["color"]);\nconst key = "petals";\nconsole.log(flower[key]);', 'Rose\npink\n12',
    'The literal creates one object with three properties. Dot and bracket notation retrieve values from that same object. flower[key] uses the value "petals" as the property name.',
    'Use brackets for keys with spaces, such as flower["bloom season"]. Reading a missing property usually gives undefined.', 'literal properties keys dot bracket notation');
  add('objects','analogy','Objects in everyday life', 'Update, add, and remove object properties.',
    'Object properties can change as your data changes. You can assign a new value to an existing property, add a new property by assignment, and remove an own property with delete. A const binding keeps referring to the same object while its properties are edited.',
    'Think of a garden notebook page. You can correct a flower’s color, add a location, or erase an outdated note while keeping the same page.',
    'const flower = { name: "Tulip", color: "yellow" };\nflower.color = "peach";\nflower.location = "Window";\ndelete flower.location;\nconsole.log(flower.color);\nconsole.log("location" in flower);', 'peach\nfalse',
    'color is updated, location is added and then deleted, and the in operator checks whether a property exists on the object or its prototype chain.',
    'Two variables can refer to the same object. Changing a property through either reference changes that shared object.', 'mutation reference delete in update');
  add('objects','types','Object patterns & built-ins', 'Recognize common object patterns without inventing new data types.',
    'Plain objects, nested objects, and objects containing methods are useful illustrative patterns, not separate fundamental JavaScript types. JavaScript also supplies built-in objects such as Date and Map. Arrays are objects designed for ordered collections. Functions are callable objects, although typeof reports "function". A class or constructor can create multiple instances with shared behavior; an object literal is usually enough for a simple record.',
    'A notebook may contain a simple flower card, a card with a smaller care card inside, or a calendar entry. Their organization differs, but they all organize information.',
    'const flower = { name: "Lily", care: { sunlight: "partial" } };\nconst colors = new Map([["Lily", "white"]]);\nconst date = new Date("2026-01-01T00:00:00Z");\nconsole.log(flower.care.sunlight);\nconsole.log(colors.get("Lily"));\nconsole.log(date.getUTCFullYear());\nconsole.log(typeof flower);', 'partial\nwhite\n2026\nobject',
    'care holds a nested object. Map stores key-value entries and retrieves one with get. Date represents a time; getUTCFullYear reads its UTC year consistently across time zones.',
    'JSON is a text format, not a JavaScript object type. JSON.stringify converts supported JavaScript data to JSON text.', 'nested built-in Date Map class constructor JSON categories');
  add('objects','methods','Properties & methods', 'Define and call an object method.',
    'A method is a function stored as an object property. In a regular method called as flower.describe(), this refers to flower. A method can read other properties and return a result. return provides a value to the caller; console.log displays it.',
    'A flower card can hold both facts and an action: “describe this flower.” The action reads the facts already written on the card.',
    'const flower = {\n  name: "Daisy",\n  color: "white",\n  describe() {\n    return `${this.name} is ${this.color}.`;\n  }\n};\nconsole.log(flower.describe());', 'Daisy is white.',
    'describe uses method shorthand. Calling it through flower supplies the receiver used by this. Its returned sentence is then printed by console.log.',
    'Arrow functions do not create their own this. Use regular method syntax when a method should read the object through this.', 'method this return receiver');
  add('objects','code','Try it: a flower object', 'Experiment with properties and a method together.',
    'Objects make it easy to keep a working model of a real thing. This flower has a name, a color, and a bloom method. Edit the color or name, then observe how the same method produces a different sentence.',
    'Imagine a flower introducing itself on a garden tour. Its introduction changes whenever the information on its card changes.',
    'const flower = {\n  name: "Rose",\n  color: "pink",\n  bloom() { return `The ${this.color} ${this.name} is blooming!`; }\n};\nconsole.log(flower.bloom());\nflower.color = "red";\nconsole.log(flower.bloom());', 'The pink Rose is blooming!\nThe red Rose is blooming!',
    'The first call reads the original color. Assignment changes color on the same object, so the second call reads red. Parentheses actually invoke the method.',
    'flower.bloom refers to the function; flower.bloom() calls it. Keep commas between object properties.', 'interactive execute bloom');
  add('arrays','intro','What are arrays?', 'Create an ordered collection and read its first item.',
    'An array holds an ordered list of values. Write its elements between square brackets and separate them with commas. Each element has a numeric index starting at 0. The length property counts the array’s slots; for a simple dense array it equals the number of items.',
    'A row of plant pots has numbered positions. JavaScript starts counting the positions at zero, so the first pot is position 0. You could also make an ordered collection of autumn leaves: maple 🍁, fallen leaf 🍂, and green leaf 🍃.',
    'const flowers = ["Rose", "Tulip", "Daisy"];\nconsole.log(flowers[0]);\nconsole.log(flowers[2]);\nconsole.log(flowers.length);', 'Rose\nDaisy\n3',
    'Index 0 accesses Rose, index 2 accesses Daisy, and length is 3. The last index in this dense array is length - 1.',
    'flowers[3] is outside this example and returns undefined. length is a property, so do not write length().', 'index zero length ordered collection');
  add('arrays','analogy','Arrays in everyday life', 'Update a list while preserving its order.',
    'Use an array when position or sequence matters. Assigning to an existing index replaces one item. push adds to the end, and pop removes and returns the last item. These operations mutate the original array.',
    'A bouquet order is a shopping list. You can replace one flower, add a final choice, and remove the last choice when the bouquet is full.',
    'const bouquet = ["Rose", "Tulip"];\nbouquet[1] = "Lily";\nbouquet.push("Daisy");\nconsole.log(bouquet.join(", "));\nconsole.log(bouquet.pop());\nconsole.log(bouquet.length);', 'Rose, Lily, Daisy\nDaisy\n2',
    'The second item becomes Lily. push appends Daisy; join makes a readable string without changing the array. pop removes Daisy, leaving two items.',
    'push returns the new length, not the array. Avoid delete on array items because it leaves an empty slot.', 'push pop join mutate replace');
  add('arrays','types','Array patterns & transformations', 'Recognize array patterns and transform a collection.',
    'Arrays of numbers, strings, mixed values, objects, and nested arrays are illustrative content patterns, not separate fundamental JavaScript types. All are arrays. Use Array.isArray to identify an array because typeof an array is "object". map builds a new array from transformed elements; filter builds a new array of matching elements. Neither method itself changes the source array, although a callback could mutate shared objects.',
    'One tray holds flower names, another holds care cards, and a shelf holds several trays. The contents differ, but each tray is still an ordered collection.',
    'const beds = [["Rose", "Lily"], ["Tulip"]];\nconst plants = [{ name: "Rose", height: 30 }, { name: "Lily", height: 15 }];\nconsole.log(beds[0][1]);\nconsole.log(plants.map(plant => plant.name).join(", "));\nconsole.log(plants.filter(plant => plant.height > 20).length);\nconsole.log(Array.isArray(plants));', 'Lily\nRose, Lily\n1\ntrue',
    'Two indexes reach a value in a nested array. map extracts every name. filter keeps only plants taller than 20, so the resulting array has one item.',
    'map returns an array; forEach is intended for side effects and returns undefined. Mixed arrays are valid but consistent data often makes code easier to read.', 'nested mixed map filter Array.isArray categories multidimensional');
  add('arrays','code','Try it: grow a flower list', 'Access, append, and iterate over array items.',
    'Programs often collect items and then process each one. A for...of loop visits the values in order. This example prints the first flower, adds a flower, displays the new length, and prints each value.',
    'Take a walk along a flower bed. You look at each plant one at a time, following the order in which it was planted.',
    'const flowers = ["Rose", "Tulip"];\nconsole.log(`First: ${flowers[0]}`);\nflowers.push("Daisy");\nconsole.log(`Total: ${flowers.length}`);\nfor (const flower of flowers) {\n  console.log(flower);\n}', 'First: Rose\nTotal: 3\nRose\nTulip\nDaisy',
    'push extends the array before the loop starts. Each iteration binds flower to the next value. The loop body prints that value.',
    'const prevents assigning a different array to flowers, but it still permits push and other mutations of that array.', 'execute loop for of iteration');
  add('functions','intro','What are functions?', 'Declare and call a reusable function.',
    'A function is a reusable block of code that performs a task or computes a result. A parameter names an input in the definition; an argument is the actual value supplied in a call. return ends the function and sends a value back. Without an explicit return value, a normal function returns undefined.',
    'A watering routine has repeatable steps. Give it the name of a plant and it prepares the same kind of message for that plant.',
    'function greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet("Mia"));\nconsole.log(greet("Noah"));', 'Hello, Mia!\nHello, Noah!',
    'name is the parameter. "Mia" and "Noah" are arguments in separate calls. Each call creates its own execution and returns a new greeting.',
    'Defining a function does not run its body. Include parentheses to call it.', 'parameter argument return declaration call');
  add('functions','analogy','Functions in everyday life', 'Combine multiple inputs and a default parameter.',
    'Functions let you describe a procedure once and use it with different inputs. A default parameter supplies a value when an argument is omitted or undefined. Variables declared inside a function normally belong to that function’s local scope.',
    'A seed packet gives a recipe: choose the number of rows and seeds per row, then multiply. The same recipe works for many gardens.',
    'function countSeeds(rows, perRow = 4) {\n  const total = rows * perRow;\n  return total;\n}\nconsole.log(countSeeds(3));\nconsole.log(countSeeds(3, 6));', '12\n18',
    'The first call uses the default perRow value 4. The second supplies 6. total is local to each call and cannot be read directly outside the function.',
    'A default does not replace null or 0. Place calculations before return, because statements after an unconditional return do not run.', 'default local scope inputs multiplication');
  add('functions','types','Declarations, expressions & arrows', 'Recognize three common function syntaxes.',
    'A function declaration uses function followed by a name. A function expression produces a function value that can be stored in a binding. An arrow function offers concise syntax; a single expression can be returned implicitly. Declarations can generally be called earlier in their scope; functions stored in const bindings must wait until initialization. These forms all create callable functions, but arrows have no own this and cannot be used as constructors.',
    'You can write the same garden recipe on a wall sign, a notebook card, or a short sticky note. Each format has a useful place.',
    'function double(value) { return value * 2; }\nconst triple = function(value) { return value * 3; };\nconst square = value => value * value;\nconsole.log(double(4));\nconsole.log(triple(4));\nconsole.log(square(4));', '8\n12\n16',
    'double is a declaration; triple stores a function expression; square stores an arrow function. square’s expression is returned without a return keyword.',
    'An arrow with a block needs an explicit return: value => { return value * value; }. Empty braces do not implicitly return a value.', 'expression arrow hoisting syntax implicit return');
  add('functions','code','Try it: a garden greeting', 'Write and reuse a function that returns a greeting.',
    'A function can return a string for another part of a program to use. Keeping return separate from console.log makes the function reusable: its result could be printed, saved, or displayed in an interface. Run the example, then try your own name.',
    'A welcome desk prepares a greeting card. The function writes the card; console.log is the person who shows it to the visitor.',
    'function greet(name) {\n  return `Welcome to BloomScript, ${name}!`;\n}\nconst message = greet("Amara");\nconsole.log(message);\nconst cheer = name => `Keep growing, ${name}!`;\nconsole.log(cheer("Amara"));', 'Welcome to BloomScript, Amara!\nKeep growing, Amara!',
    'greet returns text that is stored in message before printing. cheer uses an implicit return to build a second sentence. Both accept a name as input.',
    'If a function only calls console.log, its return value is still undefined. Use return when the caller needs the result.', 'execute greeting reusable');
  const q = (question, choices, answer, explanation) => ({question, choices, answer, explanation});
  const quizzes = {
    variables:[
      q('Which declaration is best for a binding you will reassign?', ['const','let','return','typeof'],1,'let permits reassignment and uses block scope.'),
      q('What does typeof "Rose" return?', ['number','boolean','string','array'],2,'Quoted text is a string.'),
      q('Which statement about const is true?', ['Its object properties can never change.','It must hold a number.','It prevents reassignment of the binding.','It has no scope.'],2,'const protects the binding, not the contents of an object.'),
      q('What is the result of 3 + 2?', ['"32"','5','undefined','true'],1,'Both operands are numbers, so + adds them.'),
      q('Which is a primitive JavaScript type?', ['array','Date','Map','boolean'],3,'boolean is primitive; the other choices are kinds of objects.')
    ],
    objects:[
      q('Which syntax creates an object literal?', ['["Rose"]','{ name: "Rose" }','(name = "Rose")','"name: Rose"'],1,'Curly braces with key-value pairs create an object literal.'),
      q('How do you read flower’s color property?', ['flower.color','flower->color','color.flower','flower(color)'],0,'Dot notation accesses a named property.'),
      q('What is a method?', ['An array index','A CSS rule','A function stored as an object property','Only a string'],2,'A method is a function property that can be called.'),
      q('What does this refer to in a regular method called as flower.bloom()?', ['Always the browser window','The flower object','The method name string','Always undefined'],1,'This call supplies flower as the method’s receiver.'),
      q('Which statement about nested objects is accurate?', ['They are a ninth primitive type.','They are invalid JavaScript.','They are an illustrative object pattern.','They can contain only numbers.'],2,'Nested objects remain objects; nesting describes their structure.')
    ],
    arrays:[
      q('What is the index of the first array element?', ['1','-1','0','length'],2,'JavaScript arrays use zero-based indexing.'),
      q('Which method adds an element at the end?', ['pop()','push()','join()','filter()'],1,'push mutates the array by appending items.'),
      q('What is ["Rose", "Lily"].length?', ['0','1','2','3'],2,'This dense array contains two elements.'),
      q('Which reliably checks whether a value is an array?', ['typeof value === "array"','value.isArray()','Array.isArray(value)','value === []'],2,'Array.isArray is the built-in array check.'),
      q('What does map() return?', ['Always a string','The last removed element','Always undefined','A new array of transformed results'],3,'map collects the callback’s result for each visited element.')
    ],
    functions:[
      q('What sends a result back to the caller?', ['console','return','let','push'],1,'return provides the function’s result and ends that call.'),
      q('In function greet(name) {}, what is name?', ['An argument supplied by a call','A keyword','A parameter','An array'],2,'A parameter is an input name in a function definition.'),
      q('Which is an arrow function?', ['function => greet','const double = x => x * 2;','arrow double(x)','double: return 2'],1,'The => syntax creates an arrow function.'),
      q('What does a normal function return without an explicit return value?', ['0','null','An empty string','undefined'],3,'The default return value is undefined.'),
      q('What is greet("Mia")?', ['A function call with an argument','A function declaration','An object literal','A variable declaration'],0,'Parentheses call greet and pass "Mia" as an argument.')
    ]
  };
  return {topics, lessons, quizzes};
})();
