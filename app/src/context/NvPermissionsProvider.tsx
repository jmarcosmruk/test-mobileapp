import * as Location from 'expo-location';
import { PermissionExpiration } from 'expo-modules-core';
import * as ExpoNotifications from 'expo-notifications';
import * as React from 'react';
import { Alert, Linking, Platform } from 'react-native';

export type NvPermissionsType = {
    location: {
        background: Location.LocationPermissionResponse;
        foreground: Location.LocationPermissionResponse;
    };
    notification: ExpoNotifications.NotificationPermissionsStatus;
    isLocationEnabled: boolean;
};

export type NvPermissionsContextType = {
    permissions: NvPermissionsType;
    pleaseAsk: () => void;
    pleaseSetupNotifications: () => void;
};

const permissaoInicial = {
    android: {
        scope: 'none' as 'fine' | 'coarse' | 'none',
        accuracy: 'none' as 'fine' | 'coarse' | 'none',
    },
    status: Location.PermissionStatus.UNDETERMINED,
    canAskAgain: true,
    granted: false,
    expires: 'never' as PermissionExpiration,
};

const INITIAL_STATE = {
    permissions: {
        location: {
            background: permissaoInicial,

            foreground: permissaoInicial,
        },
        notification: null,
        isLocationEnabled: false,
    },
    pleaseAsk: () => {},
    pleaseSetupNotifications: () => {},
};

export const NvPermissionsContext = React.createContext<NvPermissionsContextType>(INITIAL_STATE);

export default function NvPermissionsProvider({ children }) {
    const [permissions, setPermissions] = React.useState<NvPermissionsType>();

    React.useEffect(() => {
        pleaseAsk();
        pleaseSetupNotifications();
    }, []);

    React.useEffect(() => {
        // console.log('PERMISSIONS PROVIDER!!!' + JSON.stringify({ permissions }, undefined, 2));
    }, [permissions]);

    const pleaseAsk = async () => {
        // console.log('PLEASE ASK PERMISSIONS!!!' + JSON.stringify({ permissions }, undefined, 2));

        await askPermissions();

        if (!permissions.location.background.granted) {
            Alert.alert(
                'Permissão de Localização em Background',
                'O aplicativo NVMobile Monitriip precisa da permissão para ver a ' +
                    'localização do seu aparelho em background e durante a execução para funcionar. ' +
                    'Verifique as configurações.',
                [
                    { text: 'Ok', onPress: async () => askPermissions() },
                    {
                        text: 'Mudar Configuração',
                        onPress: () => Linking.openSettings(),
                    },
                ]
            );
        }
    };

    async function askPermissions() {
        let location = await getLocationPermissions();
        let notification = await askNotificationPermissions();
        let isLocationEnabled = await localizacaoHabilitada();

        // console.log(
        //     'PLEASE ASK PERMISSIONS FINAL!!!' +
        //         JSON.stringify({ location, notification, isLocationEnabled }, undefined, 2)
        // );

        setPermissions({ location, notification, isLocationEnabled });
    }

    const pleaseSetupNotifications = async () => {
        if (permissions.notification.granted) {
            // console.log('SETING UP NOTIFICATIONS!!!');
            if (Platform.OS === 'android') {
                ExpoNotifications.setNotificationChannelAsync('alert-appclose', {
                    name: 'alert-appclose',
                    importance: ExpoNotifications.AndroidImportance.MAX,
                    lockscreenVisibility: ExpoNotifications.AndroidNotificationVisibility.PUBLIC,
                    vibrationPattern: [250, 250, 0, 250],
                });
            }
            ExpoNotifications.setNotificationHandler({
                handleNotification: async () => {
                    return {
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: true,
                        priority: ExpoNotifications.AndroidNotificationPriority.HIGH,
                    };
                },
            });
        }
    };

    const localizacaoHabilitada = async () => {
        let locHab = await Location.hasServicesEnabledAsync();

        return locHab;
    };

    async function askNotificationPermissions() {
        let finalStatus: ExpoNotifications.NotificationPermissionsStatus;

        let initialStatus: ExpoNotifications.NotificationPermissionsStatus =
            await ExpoNotifications.getPermissionsAsync();

        if (!initialStatus || !initialStatus.granted) {
            finalStatus = await ExpoNotifications.requestPermissionsAsync();
        } else {
            finalStatus = initialStatus;
        }

        return finalStatus;
    }

    async function getLocationPermissions() {
        let backPerm: Location.LocationPermissionResponse = null;
        let forePerm: Location.LocationPermissionResponse = null;
        try {
            backPerm = await Location.getBackgroundPermissionsAsync();

            // console.log('<BACKGROUND LOCATION PERMISSIONS> ' + JSON.stringify({ backPerm }, undefined, 2));

            if (!backPerm.granted) {
                backPerm = await Location.requestBackgroundPermissionsAsync();
            }
        } catch (error) {
            // console.log('<BACKGROUND LOCATION PERMISSIONS FAILED> ' + error);
        }

        try {
            forePerm = await Location.getForegroundPermissionsAsync();

            // console.log('<FOREGROUND LOCATION PERMISSIONS> ' + JSON.stringify({ forePerm }, undefined, 2));

            if (!forePerm.granted) {
                forePerm = await Location.requestForegroundPermissionsAsync();
            }
        } catch (error) {
            // console.log('<FOREGROUND LOCATION PERMISSIONS FAILED> ' + error);
        }

        return { background: backPerm, foreground: forePerm };
    }

    return (
        <NvPermissionsContext.Provider value={{ permissions, pleaseAsk, pleaseSetupNotifications }}>
            {children}
        </NvPermissionsContext.Provider>
    );
}

export function useNvPermissions() {
    let context = React.useContext(NvPermissionsContext);

    return context.permissions;
}

export function usePleaseAskPermissions() {
    let { pleaseAsk, pleaseSetupNotifications } = React.useContext(NvPermissionsContext);

    return { pleaseAsk, pleaseSetupNotifications };
}
