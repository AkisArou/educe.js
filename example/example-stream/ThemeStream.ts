import {Stream} from "../../src";


export enum Theme {
    Light = "light",
    Dark = "dark"
}

export class ThemeStream extends Stream<Theme> {
    constructor() {
        super(true);
    }

    get initialValue(): Theme {
        return Theme.Dark
    }

    public toggleTheme = () => {
        this.nextValue(this.getValue() === Theme.Dark ? Theme.Light : Theme.Dark);
    }
}

export const themeStream = new ThemeStream();