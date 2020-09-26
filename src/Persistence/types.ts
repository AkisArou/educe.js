type TransformedValidJSONShape<T extends object> = {
    [key in keyof T]: T[key] extends Map<infer K, infer V>
        ? [K, V][]
        : T[key] extends Set<infer V> ? V[] : T[key];
};


export type PersistenceTransformGet<T extends object> = (state: TransformedValidJSONShape<T>) => T;
export type PersistenceTransformSet<T extends object> = (state: T) => TransformedValidJSONShape<T>;

export interface PersistenceTransformers<T extends object> {
    readonly onGet: PersistenceTransformGet<T>;
    readonly onSet: PersistenceTransformSet<T>;
}


export interface ISyncDatabase {
    getItem(key: string): string | null;

    setItem(key: string, item: string): void;

    removeItem(key: string): void;
}

export interface IAsyncDatabase {
    getItem(key: string): Promise<string | null>;

    setItem(key: string, item: string): Promise<void>;

    removeItem(key: string): Promise<void>;
}

export type StoreDatabase = ISyncDatabase | IAsyncDatabase;


