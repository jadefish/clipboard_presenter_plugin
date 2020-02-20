import { NativeStrategy } from './strategy/native_strategy';
import { ExecCommandStrategy } from './strategy/exec_command_strategy';

export interface Strategy {
    write(string: String): Promise<Error|null>;
}

function supportsNativeClipboard(window: Window) {
    return 'clipboard' in window.navigator
        && 'writeText' in window.navigator.clipboard;
}

export function DetermineStrategy(window: Window): Strategy {
    if (supportsNativeClipboard(window)) {
        return new NativeStrategy(window.navigator.clipboard);
    }
    else {
        return new ExecCommandStrategy(window, window.document);
    }
}
