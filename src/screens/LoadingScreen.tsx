import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import {
    NativeBaseProvider,
    Center,
    Box,
    HStack,
    Spinner,
    Heading
} from 'native-base';

// TODO: fix background color of Center component, it should match with main application background
const LoadingScreen = () => (
    <NativeBaseProvider theme={theme}>
        <Center style={styles.container} backgroundColor="gray.50">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading" size="lg" />
                    <Heading color="primary.500" fontSize="2xl">
                        Loading
                    </Heading>
                </HStack>
            </Box>
        </Center>
    </NativeBaseProvider>
);

export default memo(LoadingScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
