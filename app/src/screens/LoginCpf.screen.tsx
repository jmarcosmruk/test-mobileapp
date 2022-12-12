import FontAwesome5Icon from '@expo/vector-icons/FontAwesome5';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
// import { TextInputMask } from "react-native-masked-text";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/NvButton';
import { useNvPermissions, usePleaseAskPermissions } from '../context/NvPermissionsProvider';
import { useTheme, windowDimensions } from '../context/ThemeProvider';
import { Routes } from '../navigation/Routes';
import { NvDispatch } from '../stores/ReduxController';
import { NvRootState } from '../stores';
import MaskInput, { Masks } from 'react-native-mask-input';
// import Tips from 'react-native-tips';

function LoginCpf({ navigation }) {
    const [userCpf, setUserCpf] = useState('');
    const [password, setPassword] = useState('');
    const [imei, setImei] = useState('000000000000000');
    const [tried, setTried] = useState(false);

    const [pleaseCheckPermissions, setPleaseCheckPermissions] = useState(true);

    const { theme } = useTheme();

    const dispatch = useDispatch();

    const permissions = useNvPermissions();
    const { pleaseAsk, pleaseSetupNotifications } = usePleaseAskPermissions();

    const imei_state = useSelector((state: NvRootState) => state.imei.value);
    const auth_state = useSelector((state: NvRootState) => state.auth);

    const [passVisible, showPassword] = useState(false);

    const [keyboardShown, setKeyboardShown] = useState(false);

    const [imageHeight] = useState(210);

    const styles = createStyles(theme, passVisible, keyboardShown);

    const [imei_disable, setImeiDisable] = useState(imei_state != '');

    const [alertaServidor, setAlertaServidor] = useState<string | undefined>('');

    useEffect(() => {
        buscaAlertaServidor();
    }, []);

    async function buscaAlertaServidor() {
        setAlertaServidor('Test Message, This is coming from the server');
    }

    useEffect(() => {
        if (imei_state != '') {
            setImei(imei_state);
        }
    }, [, imei_state]);

    useEffect(() => {
        if (pleaseCheckPermissions) {
            pleaseAsk();
            setPleaseCheckPermissions(false);
        }
    }, [, pleaseCheckPermissions]);

    function openSite() {
        Linking.openURL('http://google.com');
    }

    const cpfNull = !(!!userCpf && userCpf.length > 0);

    function verifiquePermissoes() {
        try {
            // console.log('LOCATION PERMISSIONS ' + JSON.stringify({ permissions }, undefined, 2));

            return permissions.location.foreground.granted;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function autentiqueLogin() {
        try {
            if (verifiquePermissoes()) {
                if (imei.length != 15) {
                    Alert.alert('IMEI inválido', 'Verifique os dados digitados.', [{ text: 'Voltar' }]);
                    return;
                }
                let resp: { ok: boolean; value: NvLoginToken } = {
                    ok: true,
                    value: { token: 'TOKEN', auth: true, expires_in: 300000 },
                };

                if (resp.ok) {
                    NvDispatch.auth.setToken({ token: resp.value }, dispatch);
                    NvDispatch.auth.setLoginCpf({ login_cpf: userCpf }, dispatch);
                    NvDispatch.imei.setImei({ imei }, dispatch);
					navigation.navigate(Routes.PLACEHOLDER_SCREEN)
                } else {
                    console.log(JSON.stringify(resp, undefined, 2));
                    Alert.alert('Dados desconhecidos', 'Verifique o CPF e a senha digitada.', [
                        { text: 'Voltar' },
                    ]);
                    setTried(true);
                    setPassword('');
                }
            } else {
                setPleaseCheckPermissions(true);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Problema ao fazer login', 'Verifique os dados e tente novamente mais tarde.', [
                { text: 'Voltar' },
            ]);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<>
                <KeyboardAvoidingView
                    style={styles.superContainer_avoid}
                    contentContainerStyle={styles.superContainer_avoid_position}
                    behavior='position'>
                    <Image
                        source={require("../../assets/icons/icon.png")}
                        style={[styles.image, { height: imageHeight }]}
                        resizeMode='contain'
                    />

                    <Text style={styles.text_intro}>Insira as suas credenciais</Text>

                    <View style={styles.container_inner}>
                        <View
                            style={[
                                {
                                    width: 350,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                },
                            ]}>
                            <Text style={styles.text_label}>IMEI</Text>
                        </View>
                        <View style={[{ flexDirection: 'row' }]}>
                            <TextInput
                                editable={!imei_disable}
                                defaultValue={'000000000000000'}
                                style={[
                                    styles.txt_input_cpf,
                                    {
                                        color: imei_disable ? '#999' : theme.text_back,
                                    },
                                ]}
                                autoCapitalize='none'
                                keyboardType={'number-pad'}
                                value={imei}
                                maxLength={15}
                                selectionColor={theme.primary}
                                onChangeText={(imei) => setImei(imei)}
                                keyboardAppearance='default'
                            />
                            <FontAwesome5Icon
                                name={'eraser'}
                                solid={true}
                                color={theme.primary}
                                size={23}
                                style={styles.visible_icon}
                                onPress={() => {
                                    setImei('');
                                    setImeiDisable(false);
                                }}
                            />
                        </View>
                        <Text style={styles.text_label}>CPF</Text>
                        <MaskInput
                            mask={Masks.BRL_CPF}
                            placeholderFillCharacter={'X'}
                            placeholder={'000.000.000-00'}
                            style={[styles.txt_input_cpf, { width: 350 }]}
                            value={userCpf}
                            selectionColor={theme.primary}
                            onChangeText={(text, rawtext) => {
                                setUserCpf(rawtext);
                            }}
                            keyboardType='number-pad'
                        />
                        <Text style={styles.text_label}>Senha</Text>
                        <View style={[{ flexDirection: 'row' }]}>
                            <TextInput
                                style={[styles.txt_input_cpf, tried && { borderColor: theme.warn }]}
                                autoCapitalize='none'
                                testID={'camposenha'}
                                nativeID={'camposenha'}
                                secureTextEntry={!passVisible}
                                keyboardType={'default'}
                                value={password}
                                selectionColor={theme.primary}
                                autoCorrect={false}
                                onChangeText={(password) => setPassword(password)}></TextInput>
                            <FontAwesome5Icon
                                name={!passVisible ? 'eye-slash' : 'eye'}
                                solid={true}
                                color={theme.primary}
                                size={23}
                                style={[styles.visible_icon, tried && { borderColor: theme.warn }]}
                                onPress={() => showPassword(!passVisible)}
                            />
                        </View>
                    </View>
                    <View style={[styles.container_button]}>
                        <Button
                            title='Login'
                            disabled={cpfNull}
                            onPress={() => {
                                autentiqueLogin();
                                Keyboard.dismiss();
                            }}
                            style={styles.button}
                            textStyle={styles.button_text}
                            height={40}
                        />
                    </View>
                </KeyboardAvoidingView>
                {__DEV__ && (
                    <View style={[styles.container_button]}>
                        <Button
                            title='Reset'
                            disabled={false}
                            onPress={() => {
                                // TODO
                                NvDispatch.reset(dispatch);
                            }}
                            style={styles.button}
                            textStyle={styles.button_text}
                            height={40}
                        />
                    </View>
                )}
                {alertaServidor != null && (
                    <View style={styles.alert_container}>
                        <Text style={styles.alert_text}>{alertaServidor}</Text>
                    </View>
                )}
                

                <View style={styles.container_disclaimer}>
                    <Text style={styles.text_disclaimer}>{'Ainda não é nosso cliente? '}</Text>
                    <Text style={styles.link_disclaimer} onPress={() => openSite()}>
                        {'Entre em contato'}
                    </Text>
                </View>
				</>
        </TouchableWithoutFeedback>
    );
}

export default LoginCpf;

function createStyles(theme: Theme, passVisible: boolean, keyboard: boolean) {
    const insets = useSafeAreaInsets();
    return StyleSheet.create({
        background: {
            width: windowDimensions.width,
            height: windowDimensions.height + insets.top + insets.bottom,
            resizeMode: 'cover',
            alignItems: 'center',
        },
        superContainer_avoid: {
            alignItems: 'center',
        },
        superContainer_avoid_position: {
            alignItems: 'center',
        },
        container_inner: {
            alignItems: 'center',
            width: 350,
        },
        container_button: {
            marginTop: 35,
            marginBottom: 5,
            alignItems: 'center',
        },
        image: {
            marginTop: 10 + insets.top,
        },
        text_intro: {
            textAlign: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 18,
            fontFamily: 'century-gothic',
            color: theme.text_back,
        },
        text_label: {
            marginTop: 1,
            marginBottom: 0,
            marginLeft: 15,
            fontSize: 13,
            fontFamily: 'century-gothic',
            color: theme.text_back,
            textAlign: 'left',
            alignSelf: 'flex-start',
        },
        txt_input_cpf: {
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            fontSize: 18,
            height: 30,
            width: 310,
            paddingLeft: 15,
            paddingVertical: 0,
            fontFamily: 'century-gothic',
            textAlign: 'left',
            borderColor: theme.dark ? theme.primary : theme.secondary,
            backgroundColor: theme.background + '95',
            color: theme.text_back,
        },
        visible_icon: {
            backgroundColor: theme.background + '95',
            paddingTop: 3,
            paddingHorizontal: !passVisible ? 0 : 2,
            borderBottomWidth: 1,
            borderColor: theme.dark ? theme.primary : theme.secondary,
            width: 40,
            alignContent: 'center',
            justifyContent: 'center',
        },
        button: {
            width: 300,
            textAlign: 'center',
            justifyContent: 'center',
        },
        button_text: {
            fontFamily: 'century-gothic',
            fontSize: 18,
        },
        container_disclaimer: {
            marginTop: 20,
            backgroundColor: theme.background + 'AA',
            width: '100%',
            borderWidth: 1,
            borderColor: theme.secondary,
        },
        text_disclaimer: {
            marginTop: 1,
            marginBottom: 0,
            marginLeft: 15,
            fontSize: 13,
            fontFamily: 'century-gothic',
            color: theme.text_back,
            textAlign: 'center',
        },
        link_disclaimer: {
            color: '#EA1',
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'century-gothic',
            fontSize: 15,
        },
        alert_container: {
            marginTop: 20,
            backgroundColor: theme.background + 'AA',
            width: '80%',
            borderWidth: 1,
            borderColor: theme.primary,
            alignItems: 'center',
        },
        alert_text: {
            fontSize: 15,
            fontFamily: 'century-gothic',
            color: theme.text_back,
            textAlign: 'center',
        },
    });
}
