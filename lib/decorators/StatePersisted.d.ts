import { StoreConstructor } from "../types";
import { PersistenceTransformers } from "../Persistence/types";
interface StatePersistedConfig<T extends object> {
    readonly databaseVersion?: number;
    readonly transformers?: PersistenceTransformers<T>;
}
export declare function StatePersisted<T extends object>(config?: StatePersistedConfig<T>): <S extends object>(target: StoreConstructor<S>) => any;
export {};
//# sourceMappingURL=StatePersisted.d.ts.map