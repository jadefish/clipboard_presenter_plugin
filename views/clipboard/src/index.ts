import { Clipboard } from './clipboard';
import { DetermineStrategy } from './strategy';

// TODO: these defs should be in a @types/voom-presenters package.
type Hash = { [key: string]: any };
type Results = Hash;
type PluginFunc = (
    options: Hash,
    params: Hash,
    event: Event,
    results: Results
) => Promise<Results>;
interface UpgradedElement extends Element {
    vComponent: any
}

(function(root) {
    const clipboard: PluginFunc = async function clipboard(options, _params, _event, results) {
        try {
            const { action, element } = options;
            const selector = `#${element}`;

            await call(action, selector);

            results.push({
              action: 'clipboard',
              content: true,
              statusCode: 200
            });

            return Promise.resolve(results);
        }
        catch (err) {
            console.error(err);

            const message = err ? err.message : 'An error occurred';

            results.push({
              action: 'clipboard',
              contentType: 'v/errors',
              content: {exception: message},
              statusCode: 500
            });

            return Promise.reject(results)
        }
    }

    async function call(action: string, selector: string) {
        const element = root.document.querySelector(selector);

        if (!element) {
          throw new Error(`No element found matching ${selector}`);
        }

        const vComponent = (element as UpgradedElement).vComponent;

        if (!vComponent) {
            throw new Error('No Voom component associated with specified element');
        }

        const strategy = DetermineStrategy(root);
        const clipboard = new Clipboard(strategy);
        let err: Error|null;

        switch (action) {
            case 'cut': {
                err = await clipboard.cut(vComponent);
                break;
            }
            case 'copy': {
                err = await clipboard.copy(vComponent);
                break;
            }
            default: {
                err = new Error(`Invalid action ${action}`);
                break;
            }
        }

        if (err) {
            throw err;
        }
    };

    Object.defineProperty(root, 'clipboard', {value: clipboard});
})(window);
