const util      = require('util');
const Converter = require('./tree-converter');

/** Usage **/

const SampleTreeObject = {
	test:     'value1',
	testTree: {
		test2: 'value2',
		test3: 'value3',
	},
	deepTree: {
		test4: {
			test1: 'value4',
			test2: [1, '2', 3, [4, 5]],
		},
		test5: {
			test3: 'value5',
			test4: {
				final: 'deep'
			}
		}
	},
	test6:    null,
	test7:    undefined,
	test8:    NaN,
}

const marshalResult   = Converter.Marshal(SampleTreeObject);
const unmarshalResult = Converter.Unmarshal(marshalResult);

console.log("\n*** CONVERT RESULT ***\n");
console.log('MARSHAL: ', marshalResult);
console.log('UNMARSHAL: ', util.inspect(unmarshalResult, {depth: null}));

/** Begin tests */

console.log("\n*** TESTS ***\n")
console.log('MARSHAL CONVERT: ', marshalResult === JSON.stringify(SampleTreeObject));
console.log('UNMARHAL CONVERT: ', unmarshalResult.toString() === JSON.parse(marshalResult).toString());
