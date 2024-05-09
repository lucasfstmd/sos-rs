import { Theme } from '@mui/material'

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
        primary: { main: '#007320' }
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

export const ANIMATION = {
    '@keyframes fadeIn': {
        'from': {
            opacity: '0',
            transform: 'translate(0, -15px)'
        },
        'to': {
            opacity: '1',
            transform: 'translate(0, 0)'
        }
    },
    '@keyframes fadeInContent': {
        'from': {
            opacity: '0'
        },
        'to': {
            opacity: '1'
        }
    },
    fadeIn1: {
        animation: `$fadeIn 1s`
    },
    fadeIn2: {
        animation: `$fadeIn 2s`
    },
    fadeIn3: {
        animation: `$fadeIn 3s`
    },
    fadeInContent: {
        animation: `$fadeInContent 1.7s`
    }
}

export const COL_WIDTH = 44

export const TABLES = (theme: Theme) => {
    return {
        tableHeader: {
            backgroundColor: theme.palette.background.paper,
            minWidth: COL_WIDTH * 3,
            border: '1px solid #e6e6e6'
        },
        tableCell: {
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #e6e6e6',
            padding: theme.spacing(0.5)
        }
    }
}

export default CONFIG_THEME
