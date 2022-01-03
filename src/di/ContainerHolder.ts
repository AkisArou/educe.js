import {Lifetime} from "./Lifetime";
import {DefaultStoreConstructor, DefaultStoreEvents, StoreConstructor} from "../types";
import {Store} from "../Store/Store";
import {IChildContainer} from "./IChildContainer";
import {SingletonContainer} from "./containers/SingletonContainer";
import {LazySingletonContainer} from "./containers/LazySingletonContainer";
import {PerRequestContainer} from "./containers/PerRequestContainer";
import {SharedContainer} from "./containers/SharedContainer";


export class ContainerHolder {
    private readonly containers: IChildContainer[] = [
        new SingletonContainer(),
        new LazySingletonContainer(),
        new PerRequestContainer(),
        new SharedContainer()
    ];


    private tempClass?: DefaultStoreConstructor;

    public static readonly instance = new ContainerHolder();

    public bind<S extends object, E extends DefaultStoreEvents>(klass: StoreConstructor<S, E>) {
        this.tempClass = klass as unknown as DefaultStoreConstructor;
        return this;
    }

    public withLifetime(lifetime: Lifetime) {
        const container = this.getContainerByScopeType(lifetime);
        container.set(this.tempClass!);

        this.tempClass = undefined;
    }

    public get<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): Store<S, DefaultStoreEvents> {
        return this.containers
            .find(container => container.has(klass))!
            .get(klass as unknown as DefaultStoreConstructor) as unknown as Store<S, DefaultStoreEvents>;
    }

    public getContainerByScopeType(type: Lifetime): IChildContainer {
        return this.containers
            .find(container => container.type === type)!;
    }

    public getContainerByBoundClass<S extends object>(klass: StoreConstructor<S, DefaultStoreEvents>): IChildContainer {
        return this.containers
            .find(container => container.has(klass))!
    }
}