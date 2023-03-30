import React, { memo, useState, useContext } from 'react';
import { Context } from '../../App';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    Center,
    VStack,
    HStack,
    Box,
    Heading,
    Input,
    FormControl,
    Button,
    Text,
    Alert,
    Slide
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

/**
 * Type for login form data
 */
type FormData = {
    username?: string;
    password?: string;
    code?: string;
};

let timeouts: Array<NodeJS.Timeout> = new Array<NodeJS.Timeout>();

/**
 * Screen component for login screen
 */
const LoginScreen = () => {
    const [data, setData] = useState<FormData>({});
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const navigation = useNavigation();
    const { login } = useContext(Context);

    /**
     * Submit user inputted data to backend for login authentication
     */
    const submit = async () => {
        // Reset slider and remove clear callbacks
        setShowAlert(false);
        timeouts.forEach((timeout) => {
            clearTimeout(timeout);
            timeouts.pop();
        });

        try {
            const result = await axios.post(
                'https://cis-linux2.temple.edu/bucketlistBackend/login',
                {
                    username: data.username,
                    password: data.password,
                    code: data.code
                }
            );

            // Successful login
            setShowAlert(false);
            login(result.data.token);
        } catch (error) {
            // Show slider and set timeout to clear slider
            setShowAlert(true);
            timeouts.push(
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Center>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading size="xl">Welcome</Heading>
                        <Heading mt="1" size="sm">
                            Please log in!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl isRequired>
                                <FormControl.Label>Username</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="text"
                                    onChangeText={(value) => {
                                        setData({ ...data, username: value });
                                    }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, password: value });
                                    }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>MFA Code</FormControl.Label>
                                <Input
                                    size="lg"
                                    type="password"
                                    onChangeText={(value) => {
                                        setData({ ...data, code: value });
                                    }}
                                />
                            </FormControl>
                            <Button
                                onPress={submit}
                                mt="2"
                                colorScheme="indigo"
                            >
                                Log in
                            </Button>
                            <HStack>
                                <Text>Don't have an account? </Text>
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Signup')
                                    }
                                    underline
                                >
                                    Sign up
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>
                    <Slide in={showAlert} placement="top">
                        <Alert justifyContent="center" status="error">
                            <Alert.Icon />
                            <Text color="error.600" fontWeight="medium">
                                Invalid credentials
                            </Text>
                        </Alert>
                    </Slide>
                </Center>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center'
    }
});
