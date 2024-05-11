// REACTJS IMPORTS
import React, { useState } from "react";

// REACT NATIVE IMPORTS
import { View, ActivityIndicator, StyleSheet } from "react-native";

// EXPO
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { router } from "expo-router";

// LIBRARIES
import axios from "axios";

// CONFIG
import { AWS_EC2_PATH } from "@/config";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { ToastUtil } from "@/components/ui/toast";

// EXPO ICONS
import { FontAwesome } from '@expo/vector-icons';

export const AiOrderContent = () => {
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSwitchToActiveOrders = () => {
        router.push("(screens)/active-orders");
    };

    const handleSwitchToManualOrder = () => {
        router.replace("(screens)/manual-order");
    };

    const startRecording = async () => {
        try {
            const { status: audioPerm } = await Audio.requestPermissionsAsync();
            if (audioPerm !== 'granted') {
                console.error('Audio permissions not granted');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            setRecording(recording);
            setIsRecording(true);
        } catch (error) {
            ToastUtil.error("Error in recording voice!");
        }
    };
    
    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();

            const uri = await recording.getURI();
            if (uri) {
                sendAudioToBackend(uri);
            }

            setIsRecording(false);
        } catch (error) {
            ToastUtil.error("Error in stopping recording!");
        }
    };
    
    const sendAudioToBackend = async (uri: string) => {
        setIsLoading(true);

        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { 
                encoding: FileSystem.EncodingType.Base64 
            });

            const payload = {
                file: base64,
                content_type: 'audio/mpeg',
                file_name: `recording_${new Date().toISOString()}.m4a`
            };

            const apiResponse = await axios.post(`${AWS_EC2_PATH}/get_transcription`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (apiResponse.data) {
                console.log(apiResponse.data);
                const transcription = apiResponse.headers['x-transcription'];
                console.log("Received transcription:", transcription);
                router.push({
                    pathname: "(screens)/order-details",
                    params: {
                        transcribedText: apiResponse.data
                    }
                });
            } else {
                ToastUtil.error("Error getting orders. If issue persists switch to manual order!");
            }
        } catch (error) {
            ToastUtil.error("Error sending audio to backend. If issue persists switch to manual order!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex flex-1 justify-between">
            <View className="flex items-center pt-5 w-full gap-y-3">
                <Button
                    className="w-[90%]"
                    variant="blue"
                    onPress={handleSwitchToActiveOrders}
                >
                    Active orders
                </Button>
                <Button 
                    className="w-[90%]" 
                    variant="gray"
                    onPress={handleSwitchToManualOrder}
                >
                    Switch to manual order
                </Button>
            </View>

            <View className="flex items-center">
                <View className={`p-9 rounded-full ${isRecording ? 'border border-green-500' : 'border border-red-500'}`}>
                    <FontAwesome name="microphone" size={36} color={isRecording ? "green" : "gray"} />
                </View>
            </View>

            <View className="flex items-center pb-5">
                <View className="flex flex-col items-center gap-y-4 w-full">
                    {!isRecording ? (
                        <Button onPress={startRecording} className="w-[90%]">Start</Button>
                    ) : (
                        <Button onPress={stopRecording} className="w-[90%]">Stop</Button>
                    )}
                </View>
            </View>

            {isLoading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#e64b4f" />
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }
});