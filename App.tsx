import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, BackHandler } from 'react-native';
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

SplashScreen.preventAutoHideAsync();

export default function App() {

    const { theme } = useTheme();

    const [loaded, setLoaded] = React.useState(false);

    async function loadFonts() {
        console.log('CARREGANDO FONTES');
        Font.loadAsync({
            'century-gothic': require('./app/assets/fonts/century-gothic/century-gothic.ttf'),
            'century-gothic-bold': require('./app/assets/fonts/century-gothic/century-gothic-bold.ttf'),
        }).then(() =>{
            console.log('----------------------------------------------------CARREGADAS......');
            setLoaded(true);
        });

        
    }

    React.useEffect(() => {
        loadFonts();
    }, []);

    React.useEffect(() => {
        if (loaded) {
            hideSplash();
        }
    }, [, loaded]);

    const onLayoutRootView = React.useCallback(() => {
        console.log(JSON.stringify({message: 'TELA PRONTA' , loaded} ));
        if (loaded) {
            hideSplash();
        }
    }, [,loaded]);

    async function hideSplash() {
        console.log('VERIFICANDO FONTES');
        console.log('FONTES CARREGADAS?');
        SplashScreen.hideAsync();
    }

    return (
        // <AppearanceProvider>
        <NavigationContainer onReady={onLayoutRootView}>
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
