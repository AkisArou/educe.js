declare type TransformedValidJSONShape<T extends object> = {
    [key in keyof T]: T[key] extends Map<infer K, infer V> ? [K, V][] : T[key] extends Set<infer V> ? V[] : T[key];
};
export declare type PersistenceTransformGet<T extends object> = (state: TransformedValidJSONShape<T>) => T;
export declare type PersistenceTransformSet<T extends object> = (state: T) => TransformedValidJSONShape<T>;
export interface PersistenceTransformers<T extends object> {
    readonly onGet: PersistenceTransformGet<T>;
    readonly onSet: PersistenceTransformSet<T>;
}
export {};
//# sourceMappingURL=types.d.ts.map