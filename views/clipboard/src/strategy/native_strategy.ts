import { Strategy } from '../strategy';

// NativeStrategy is a clipboard interaction strategy which utilizes the
// browser's native asynchronous clipboard API.
export class NativeStrategy implements Strategy {
    private clipboard: Clipboard;

    constructor(clipboard: Clipboard) {
        this.clipboard = clipboard;
    }

    async write(value: string): Promise<Error|null> {
        await this.clipboard.writeText(value);

        return null;
    }
}
