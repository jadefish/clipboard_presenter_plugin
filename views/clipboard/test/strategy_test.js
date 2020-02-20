import { DetermineStrategy } from '../src/strategy';
import { NativeStrategy } from '../src/strategy/native_strategy';
import { ExecCommandStrategy } from '../src/strategy/exec_command_strategy';

const MockWindow = Mock(global.window);

test('DetermineStrategy() returns NativeStrategy when Clipboard is supported', function() {
    const nav = Mock({clipboard: {writeText: jest.fn()}})();
    const win = MockWindow({navigator: nav});

    expect(DetermineStrategy(win)).toBeInstanceOf(NativeStrategy);
});

test('DetermineStrategy() returns ExecCommandStrategy when Clipboard is not supported', function() {
    const nav = Mock({})();
    const win = MockWindow({navigator: nav});

    expect(DetermineStrategy(win)).toBeInstanceOf(ExecCommandStrategy);
});
