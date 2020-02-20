import { ClipboardError } from '../src/clipboard_error';

test('message contains provided clipboard action', () => {
    const error = new ClipboardError('annihilate');

    expect(error.message).toContain('annihilate');
})
