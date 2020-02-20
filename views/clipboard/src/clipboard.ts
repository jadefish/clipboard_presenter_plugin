import { Strategy } from './strategy';

interface readable {
    value(): any;
}

interface clearable {
    clear(): void;
}

export class Clipboard {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    async cut(vComponent: readable & clearable): Promise<Error|null> {
        const err = await this.strategy.write(vComponent.value());

        if (!err) {
            vComponent.clear();
        }

        return Promise.resolve(err);
    }

    async copy(vComponent: readable): Promise<Error|null> {
        return this.strategy.write(vComponent.value());
    }
}
