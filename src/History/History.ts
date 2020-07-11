import {ENTIRE_STATE} from "../Eventing/ENTIRE_STATE";

// For now unlimited state saving... Check for setting up a LIMIT.
export class History<T extends object> {
    private states: T[] = [];
    private currentIdx = 0;

    public previousState<K extends keyof T>(prop: K | typeof ENTIRE_STATE) {
        if (!this.states[this.currentIdx - 1]) return;
        this.currentIdx -= 1;
        return this.getValue(prop);
    }

    public nextState<K extends keyof T>(prop: K | typeof ENTIRE_STATE) {
        if (!this.states[this.currentIdx + 1]) return;
        this.currentIdx += 1;
        return this.getValue(prop);
    }

    public stateAt<K extends keyof T>(idx: number, prop: K | typeof ENTIRE_STATE) {
        if (!this.states[idx]) return;
        this.currentIdx = idx;
        return this.getValue(prop);
    }

    private getValue<K extends keyof T>(prop: K | typeof ENTIRE_STATE): T | Partial<T> {
        return typeof prop === "string"
            ? {[prop]: this.states[this.currentIdx][prop as K]} as unknown as Partial<T>
            : this.states[this.currentIdx];
    }

    public pushState(state: T): void {
        this.states.push(state);
        this.currentIdx = this.states.length - 1;
    }

    public clearStateHistory(): void {
        this.states.length = 0;
        this.currentIdx = 0;
    }
}
