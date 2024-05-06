// REACTJS IMPORTS
import React, { useState } from "react";

// REACT NATIVE IMPORTS
import { Audio } from 'expo-av';
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import * as FileSystem from 'expo-file-system';

// LIBRARIES
import axios from 'axios';
import { Buffer } from 'buffer';

// CONFIG
import { AWS_EC2_PATH } from "@/config";

// COMPONENTS
import { Button } from "@/components/ui/button";

// LUCIDE ICONS
import { Mic } from "lucide-react-native";

export const HomeContent = () => {
    const { top, bottom } = useSafeAreaInsets();

    const [text, setText] = useState('');
    const [recording, setRecording] = useState(null);

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
    
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
    
            setRecording(recording);
        } catch (error) {
            console.error('Error in recording audio:', error);
        }
    };
    
    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();
            const uri = await recording.getURI();
    
            if (uri) {
                sendAudioToWhisperAPI(uri);
                console.log("URI Sent: ", uri)
            }
        } catch (error) {
            console.error('Error in stopping recording:', error);
        }
    };

    const sendAudioToWhisperAPI = async (audioUri: string) => {
        try {
            const url = `${AWS_EC2_PATH}/get_transcription`;
            console.log('Sending to URL:', url);
            console.log('Received URI', audioUri);
    
            // Read file as an ArrayBuffer
            const fileContent = await FileSystem.readAsStringAsync(audioUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            // Encode the ArrayBuffer in base64 using Buffer
            const base64Audio = Buffer.from(fileContent).toString('base64');
    
            // Create a new FormData object
            const formData = new FormData();
    
            // Convert base64 string to Blob
            const response = await fetch(`data:audio/m4a;base64,${base64Audio}`);
            const blob = await response.blob();
    
            // Append the audio data to the form with the key 'file'
            formData.append('file', blob, 'filename.m4a');
    
            // Send the form data in the Axios POST request
            const apiResponse = await axios.post(url, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('API Response:', apiResponse.data);
    
            if (apiResponse.data) {
                setText(apiResponse.data);
            } else {
                console.log('No recognized text found in the response.');
            }
        } catch (error) {
            console.error('Detailed error:', error);
            console.error('Error Message:', error.message);
            if (error.config) {
                console.error('Error Config:', JSON.stringify(error.config));
            }
        }
    };
    
    return (
        <View style={{ paddingTop: top, paddingBottom: bottom }} className="flex flex-1">
            <View className="flex flex-1 justify-between">
                <View className="flex items-center">
                    <Text className="font-bold text-2xl">Welcome</Text>
                </View>

                <View className="flex items-center">
                    <View className="flex border border-red-500 p-7 rounded-full">
                        <Mic color="gray" size={64} />
                    </View>
                </View>

                <View className="flex items-center">
                    <Text>Recognized Text: {text}</Text>
                    <Button onPress={startRecording} className="w-[90%]">Start</Button>
                    <Button onPress={stopRecording}>Stop</Button>
                </View>
            </View>
        </View>
    );
};