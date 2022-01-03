export interface StoreEvent {
    readonly type: unknown;
}

export type StoreEvents<T> = T[keyof T];

export interface HistoryConfig {
    readonly historyLimit: number;
}
