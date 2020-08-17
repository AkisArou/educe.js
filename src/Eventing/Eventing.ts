import {ENTIRE_STATE} from "../Eventing/ENTIRE_STATE";
import {IStateSetters, StateSetter} from "../Eventing/types";

export default class Eventing<T> {
    public stateSetters: IStateSetters<T> = {} as IStateSetters<T>;

    public subscribe = <K extends keyof T>(listener: StateSetter<T>, subProps: K | K[] | typeof ENTIRE_STATE): void => {
        if (subProps instanceof Array)
            subProps.forEach(port => this.subscribe(listener, port));
        else {
            const portionListeners = this.stateSetters[subProps as K] || new Set<StateSetter<T>>();
            portionListeners.add(listener);
            this.stateSetters[subProps as K] = portionListeners;
        }
    };


    public unsubscribe = <K extends keyof T>(listener: StateSetter<T>, unsubscribableProps: Set<K | K[] | typeof ENTIRE_STATE>,): void => {
        unsubscribableProps.forEach(prop => {
            if (prop instanceof Array)
                prop.forEach(p => this.stateSetters[p].delete(listener));
            else
                this.stateSetters[prop as K].delete(listener)
        });
    };

    public trigger = <K extends keyof T>(prop: K, data: T): void => {
        this.stateSetters[prop]?.forEach(ln => ln(data));
        this.stateSetters[ENTIRE_STATE as K]?.forEach(ln => ln(data));
    };
}