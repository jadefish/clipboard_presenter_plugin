import { NativeStrategy } from '../../src/strategy/native_strategy';

const MockClipboard = Mock({}, {
    writeText: async function(value) {
        this.written = true;
        this.value = value;
    }
});

test('write() writes to the clipboard', async function() {
    const clipboard = MockClipboard();
    const strategy = new NativeStrategy(clipboard);

    await strategy.write('foo');

    expect(clipboard.written).toBe(true);
    expect(clipboard.value).toBe('foo');
})
