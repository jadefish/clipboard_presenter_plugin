export class ClipboardError extends Error {
    constructor(action: string) {
        super(`Unable to ${action} text`);
    }
};
