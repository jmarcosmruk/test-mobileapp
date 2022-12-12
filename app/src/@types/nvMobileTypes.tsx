type Theme = {
    name: string;
    dark: boolean;
    background: string;
    primary: string;
    secondary: string;
    warn: string;
    text_back: string;
    text_prim: string;
    text_sec: string;
};

type ThemeType = {
    label: string;
    dark: Theme;
    light: Theme;
};

type NvThemeContext = {
    theme: Theme;
    setTheme: Function;
};


type NvLoginToken = {
    auth: boolean;
    token: string;
    expires_in: number;
};

type NvAction<T> = {
    payload: T;
};


type NvAuthState = {
    token: NvLoginToken;
    login_cpf: string;
    historico_cpf: string[];
};

type NvImeiState = {
    value: string;
};
