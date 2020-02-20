/* istanbul ignore file */ // not Constantinople.

function inflateStubs(obj, stubs) {
    if (stubs instanceof Array) {
        const newStubs = {};

        for (const name of stubs) {
            newStubs[name] = jest.fn()
        }

        stubs = newStubs;
    }

    if (!(stubs instanceof Object)) {
        throw new Error('stubs must be an array of names or an object of name => return value pairs');
    }

    for (const [k, v] of Object.entries(stubs)) {
        // console.log(`defining property "${k}" on`, obj, `: ${v.toString()}`)
        Object.defineProperty(obj, k, {
            writable: true,
            value: v
        });
    }

    return obj;
}

// e.g. DocumentMock = Mock(global.document, {createRange: true});
//      testSpecificDocument = DocumentMock({testSpecificFn: 1.21});
//      testSpecificDocument.createRange() // returns true
//      testSpecificDocument.testSpecificFn() // returns 1.21
const Mock = function(base = {}, stubs = {}) {
    const obj = inflateStubs(base, stubs);

    return (additionalStubs = {}) => {
        return inflateStubs(obj, additionalStubs);
    }
}

export default Mock;
