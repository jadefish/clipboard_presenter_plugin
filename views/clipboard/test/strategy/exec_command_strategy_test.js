import { ExecCommandStrategy } from '../../src/strategy/exec_command_strategy';
import { ClipboardError } from '../../src/clipboard_error';


const range = Mock({}, ['selectNodeContents']);
const MockDocument = Mock(global.document, {createRange: range});
const selection = Mock({}, ['removeAllRanges', 'addRange']);
const MockWindow = Mock(global.window, {getSelection: selection});

test('write() writes to the clipboard', async function() {
    const doc = MockDocument({
        queryCommandEnabled: () => true,
        execCommand: () => true
    });
    const win = MockWindow();
    const strategy = new ExecCommandStrategy(win, doc);

    expect(await strategy.write('foo')).toBeNull();
})

test('write() returns a ClipboardError on failure', async function() {
    const doc = MockDocument({
        queryCommandEnabled: () => false,
        execCommand: () => false
    });
    const win = MockWindow();
    const strategy = new ExecCommandStrategy(win, doc);

    expect(await strategy.write('foo')).toBeInstanceOf(ClipboardError)
});
