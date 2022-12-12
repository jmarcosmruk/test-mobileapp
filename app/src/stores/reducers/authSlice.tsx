import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState: NvAuthState = {
	token: {
		auth: false,
		token: "",
		expires_in: 0,
	},
	login_cpf: "",
	historico_cpf: [],
};

const reset = createAction(null);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state: NvAuthState, action: NvAction<NvLoginToken>) => {
			// console.log("ACTION " + JSON.stringify(action, undefined, 2));
			return { ...state, token: action.payload };
		},
		removeToken: (state: NvAuthState) => {
			return { ...state, token: initialState.token };
		},
		addCpf: (state: NvAuthState, action: NvAction<string>) => {
			state.historico_cpf.push(action.payload);
			return state;
		},
		removeCpf: (state: NvAuthState, action: NvAction<string>) => {
			let i = state.historico_cpf.indexOf(action.payload);

			if (i > -1) {
				state.historico_cpf.splice(i, 1);
			}
			return state;
		},
		setLoginCpf: (state: NvAuthState, action: NvAction<string>) => {
			return { ...state, login_cpf: action.payload };
		},
		removeLoginCpf: (state: NvAuthState) => {
			return { ...state, login_cpf: initialState.login_cpf };
		},
		
	},
	extraReducers: (builder) =>  {
        builder.addCase(
            reset, (state) => initialState
        )
    }
});

export const {
	addCpf,
	removeCpf,
	setLoginCpf,
	removeLoginCpf,
	setToken,
	removeToken,
} = authSlice.actions;

export default authSlice