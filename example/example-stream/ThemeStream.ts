import {Stream} from "../../src";

export class ThemeStream extends Stream<Theme> {
    constructor() {
        super(true);
    }

    get initialData(): Theme {
        return ThemeHandler.getTheme();
    }

    onToggleThemeClicked = () => {
        const theme = ThemeHandler.toggleTheme();
        this.dataChanged(theme);
    }
}