import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NvContextsProvider from './app/src/context/NvContextsProvider';
import { useTheme } from './app/src/context/ThemeProvider';
import Main from './app/src/navigation/Main';
import { store, persistor } from './app/src/stores';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage from 'react-native-flash-message';

export default function App() {
    const { theme } = useTheme();

    // const loadResources = async () => {
    //     // console.log("Carregando recursos");

    //     let fonts = Font.loadAsync({
    //         'century-gothic': require('./app/assets/fonts/century-gothic/century-gothic.ttf'),
    //         'century-gothic-bold': require('./app/assets/fonts/century-gothic/century-gothic-bold.ttf'),
    //     });

    //     return fonts;
    // };

    // function errorMessage() {
    //     // console.log("ERRO AO CARREGAR FONTES!!!")
    //     if (Platform.OS == 'web') {
    //         alert('Problema ao iniciar. Por favor recarregue a página.');
    //     } else {
    //         Alert.alert(
    //             'Problema ao iniciar',
    //             'Reinicie o aplicativo',
    //             [{ text: 'Ok', onPress: () => BackHandler.exitApp() }],
    //             { cancelable: false }
    //         );
    //     }
    // }

    // const [resourcesLoaded, setResourcesLoaded] = useState(false);

    // function resourcesLoading() {
    //     return (
    //         <AppLoading
    //             startAsync={loadResources}
    //             onFinish={() => setResourcesLoaded(true)}
    //             onError={() => errorMessage()}
    //         />
    //     );
    // }

    // if (!resourcesLoaded) {
    //     return resourcesLoading();
    // }
    
    // const [loaded, setLoaded] = React.useState(false)

    // async function loadFonts(){

        Font.useFonts({
            'century-gothic': require('./app/assets/fonts/century-gothic/century-gothic.ttf'),
            'century-gothic-bold': require('./app/assets/fonts/century-gothic/century-gothic-bold.ttf'),
        });

    //     setLoaded(true);
    // }

    

    // React.useEffect(() => {
    //     console.log('PREPARANDO SPLASHSCREEN');
    //     // SplashScreen.preventAutoHideAsync();

    //     fetch('http://192.168.100.5:8081/api/loging?log=PREPARANDO SPLASHSCREEN');
    //     loadFonts();
    // }, []);

    // React.useEffect(()=> {
    //     hideSplash();
    // }, [,loaded])

    // const onLayoutRootView = React.useCallback(() => {
    //     hideSplash()     
    // }, [loaded]);

    // async function hideSplash(){
    //     console.log('VERIFICANDO FONTES');
    //     if (loaded) {
    //         console.log('FONTES CARREGADAS');
    //         // await SplashScreen.hideAsync()
    //         setLoaded(true);
    //     }
    // }

    // if (!loaded) {
    //     return null
    // }

    return (
        // <AppearanceProvider>
        <NavigationContainer onReady={()=>{}}>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider>
                        <PaperProvider>
                            <NvContextsProvider>
                                <StatusBar backgroundColor={theme.primary} animated={true} style='light' />
                                <Main />

                                <FlashMessage position='top' />
                            </NvContextsProvider>
                        </PaperProvider>
                    </SafeAreaProvider>
                </PersistGate>
            </ReduxProvider>
        </NavigationContainer>
        // </AppearanceProvider>
    );
}

