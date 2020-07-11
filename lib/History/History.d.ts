import { ENTIRE_STATE } from "../Eventing/ENTIRE_STATE";
export declare class History<T extends object> {
    private states;
    private currentIdx;
    previousState<K extends keyof T>(prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    nextState<K extends keyof T>(prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    stateAt<K extends keyof T>(idx: number, prop: K | typeof ENTIRE_STATE): Partial<T> | undefined;
    private getValue;
    pushState(state: T): void;
    clearStateHistory(): void;
}
//# sourceMappingURL=History.d.ts.map