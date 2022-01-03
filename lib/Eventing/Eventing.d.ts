import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
import { IStateSetters, StateSetter } from "./types";
export default class Eventing<T> {
    stateSetters: IStateSetters<T>;
    subscribe: <K extends keyof T>(subProps: typeof ENTIRE_STATE | K | K[], listener: StateSetter<T>) => void;
    unsubscribe: <K extends keyof T>(unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>, listener: StateSetter<T>) => void;
    trigger: <K extends keyof T>(prop: K, data: T) => void;
}
//# sourceMappingURL=Eventing.d.ts.map