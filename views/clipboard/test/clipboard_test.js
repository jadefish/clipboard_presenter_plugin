import { Clipboard } from '../src/clipboard';

const MockStrategy = Mock({written: false}, ['write']);
const MockComponent = Mock({cleared: false}, ['value', 'clear']);

test("cut does not return an error", async function() {
    const clipboard = new Clipboard(MockStrategy());

    expect(await clipboard.cut(MockComponent())).not.toBeInstanceOf(Error);
});

test("cut returns the strategy's error on failure", async function() {
    const strategy = MockStrategy({
        write: () => { return new Error('I am error'); }
    });
    const clipboard = new Clipboard(strategy);
    const err = await clipboard.cut(MockComponent());

    expect(err).toBeInstanceOf(Error);
    expect(err.message).toContain('I am error');
});

test("cut invokes strategy's write()", async function() {
    const strategy = MockStrategy({
        written: false,
        write: function() { this.written = true; }
    });
    const clipboard = new Clipboard(strategy);

    await clipboard.cut(MockComponent())

    expect(strategy.written).toBe(true);
});

test("cut clears the component's value", async function() {
    const clipboard = new Clipboard(MockStrategy());
    const component = MockComponent({
        clear: function() { this.cleared = true; }
    });

    await clipboard.cut(component)

    expect(component.cleared).toBe(true);
});
