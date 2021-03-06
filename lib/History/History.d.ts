import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
export declare class History<T extends object> {
    private readonly historyLimit;
    private states;
    private currentIdx;
    constructor(historyLimit: number);
    query(fn: (state: T) => boolean): T | undefined;
    previousState<K extends keyof T>(prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    nextState<K extends keyof T>(prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    stateAt<K extends keyof T>(idx: number, prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    private getValue;
    pushState(state: T): void;
    clearStateHistory(): void;
}
//# sourceMappingURL=History.d.ts.map