# Tree data structures converter

Language: `JavaScript`  
Environment: `NodeJS`

Run:
```bash
node index.js
```

Demo output:
```text
*** CONVERT RESULT ***

MARSHAL:  {"test":"value1","testTree":{"test2":"value2","test3":"value3"},"deepTree":{"test4":{"test1":"value4","test2":[1,"2",3,[4,5]]},"test5":{"test3":"value5","test4":{"final":"deep"}}},"test6":null,"test8":null}
UNMARSHAL:  { test: 'value1',
  testTree: { test2: 'value2', test3: 'value3' },
  deepTree:
   { test4: { test1: 'value4', test2: [ 1, '2', 3, [ 4, 5 ] ] },
     test5: { test3: 'value5', test4: { final: 'deep' } } },
  test6: null,
  test8: null }

*** TESTS ***

MARSHAL CONVERT:  true
UNMARHAL CONVERT:  true
```
