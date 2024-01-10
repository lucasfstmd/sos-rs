export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export const parseStringToThemeMode = (theme: string): ThemeMode => {
    switch (theme) {
        case 'light':
            return ThemeMode.LIGHT
        case 'dark':
            return ThemeMode.LIGHT
    }
    return ThemeMode.LIGHT
}

const DEFAULT_THEME: any = {
    spacing: 10,
    palette: {
        primary: { main: '#1976D2' }
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: window.screen.width <= 1366 ? 12 : 14
    }
}

const DARK_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        mode: 'dark'
    }
}

const LIGHT_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        mode: 'light'
    }
}

const CONFIG_THEME = {
    light: LIGHT_THEME,
    dark: DARK_THEME
}

export default CONFIG_THEME
