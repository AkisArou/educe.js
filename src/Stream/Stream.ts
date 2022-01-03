type Listener<T> = (data: T) => unknown;
export type UnsubscribeFunction = () => boolean;

export abstract class Stream<T> implements AsyncIterable<T> {
    private listeners = new Set<Listener<T>>();
    private finishListeners?: Set<Listener<void>>;
    private resolver?: Listener<T>;
    private promiseResolvers: Promise<T>[] = [new Promise<T>(res => this.resolver = res)];
    private _hasFinished = false;
    private readonly onListenMustShowPreviousData: boolean;
    private value: T | null = null;

    protected constructor(onListenMustShowPreviousData: boolean = false) {
        this.onListenMustShowPreviousData = onListenMustShowPreviousData;
    }

    abstract get initialValue(): T

    public getValue(): T {
        return this.value ?? this.initialValue;
    }


    async* [Symbol.asyncIterator](): AsyncIterator<T> {
        if (this.onListenMustShowPreviousData)
            yield this.getValue();

        while (!this._hasFinished)
            yield this.promiseResolvers[0];
    }

    async next(...args: [] | [any]): Promise<IteratorResult<T, void>>;
    async next(...args: [] | [unknown]): Promise<IteratorResult<T, void>>;
    async next(...args: [] | [T]): Promise<IteratorResult<T, void>> {
        if (this._hasFinished)
            return {done: true, value: undefined};
        else
            return {done: false, value: await this.promiseResolvers[0]};
    }

    async return(): Promise<IteratorResult<T, void>> {
        return {done: true, value: undefined};
    }

    async throw(err: Error): Promise<IteratorResult<T, Error>> {
        return {done: true, value: err};
    }


    public subscribe(ls: Listener<T>): UnsubscribeFunction {
        if (this.onListenMustShowPreviousData)
            ls(this.getValue());
        this.listeners.add(ls);
        return () => this.listeners.delete(ls);
    }

    public unsubscribe(ls: Listener<T>): void {
        this.listeners.delete(ls);
    }

    public nextValue(data: T): void {
        if (this.onListenMustShowPreviousData) this.value = data;
        this.listeners.forEach(ls => ls(data));
        this.resolver?.(data);
        this.promiseResolvers.splice(0, 1, new Promise<T>(res => this.resolver = res));
    }

    public get hasFinished() {
        return this._hasFinished
    };

    public async finish() {
        this._hasFinished = true;
        this.listeners.clear();
        this.finishListeners?.forEach(ls => ls());
        this.finishListeners?.clear();
        await this.return();
        this.resolver = undefined;
        this.promiseResolvers = [];
        this.value = null;
    }

    public onFinish(ls: Listener<void>): UnsubscribeFunction {
        if(!this.finishListeners) this.finishListeners = new Set<Listener<void>>();
        this.finishListeners.add(ls);
        return () => this.finishListeners!.delete(ls);
    }

    public unsubscribeFinish(ls: Listener<void>) {
        this.finishListeners?.delete(ls);
    }
}
