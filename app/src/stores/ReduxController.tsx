import * as React from "react";
import { Dispatch } from "redux";
import * as Auth from "./reducers/authSlice";
import * as Imei from "./reducers/imeiSlice";

const NvAuthDispatch = {
	setToken(action: { token: NvLoginToken }, dispatch: Dispatch) {
		dispatch(Auth.setToken(action.token));
	},

	removeToken(dispatch: Dispatch) {
		dispatch(Auth.removeToken());
	},

	setLoginCpf(action: { login_cpf: string }, dispatch: Dispatch) {
		dispatch(Auth.setLoginCpf(action.login_cpf));
	},

	removeLoginCpf(dispatch: Dispatch) {
		dispatch(Auth.removeLoginCpf());
	},
};

const NvImeiDispatch = {
	setImei(action: { imei: string }, dispatch: Dispatch) {
		dispatch(Imei.setImei(action.imei));
	},

	removeImei(dispatch: Dispatch) {
		dispatch(Imei.removeImei());
	},
};


export const NvDispatch = {
	auth: NvAuthDispatch,
	imei: NvImeiDispatch,
	reset(dispatch: Dispatch) {
		console.log("RESET")
		console.log(JSON.stringify(dispatch, undefined, 2))
		dispatch({type: "reset"});
	},
};
