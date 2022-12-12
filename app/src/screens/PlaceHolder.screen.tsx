import * as React from 'react';
import { Text, View } from 'react-native';


export default function PlaceHolderScreen() {

	React.useEffect(() => {
		fetch('http://192.168.100.5:8081/api/loging?log=ABRINDO PLACEHOLDER SCREEN')
	}, [])

    return (
        <View
            style={{
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
            <Text>Em Construção...</Text>
        </View>
    );
}
