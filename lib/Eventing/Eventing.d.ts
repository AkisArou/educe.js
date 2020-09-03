import { ENTIRE_STATE } from "../constants/ENTIRE_STATE";
import { IStateSetters } from "../Eventing/types";
export default class Eventing<T> {
    stateSetters: IStateSetters<T>;
    subscribe: <K extends keyof T>(listener: (state: T) => any, subProps: typeof ENTIRE_STATE | K | K[]) => void;
    unsubscribe: <K extends keyof T>(listener: (state: T) => any, unsubscribableProps: Set<typeof ENTIRE_STATE | K | K[]>) => void;
    trigger: <K extends keyof T>(prop: K, data: T) => void;
}
//# sourceMappingURL=Eventing.d.ts.map