import { Strategy } from '../strategy';
import { ClipboardError } from '../clipboard_error';

// ExecCommandStrategy is a clipboard interaction strategy which utilizes the
// browser's deprecated `document.execCommand` method.
export class ExecCommandStrategy implements Strategy {
    private window: Window;
    private document: Document;

    constructor(window: Window, doc: Document) {
        this.window = window;
        this.document = doc;
    }

    async write(value: string): Promise<Error|null> {
        const range = this.document.createRange();

        return usingTextArea(value, textArea => {
            range.selectNodeContents(textArea);

            const selection = this.window.getSelection();

            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }

            textArea.setSelectionRange(0, 10e4)

            const enabled = this.document.queryCommandEnabled('copy');
            const succeeded = enabled && this.document.execCommand('copy');

            if (!succeeded) {
                return new ClipboardError('copy');
            }

            return null;
        });
    }
}

type textAreaCallback = (element: HTMLTextAreaElement) => any;

function usingTextArea(text: string = '', fn: textAreaCallback): any {
    const element = document.createElement('textarea');

    element.textContent = text;
    element.style.position = 'fixed';
    element.style.left = '0px';
    element.style.top = '0px';
    element.style.width = '1px';
    element.style.height = '1px';

    document.body.insertAdjacentElement('afterbegin', element);

    const result = fn(element);

    element.remove();

    return result;
}
