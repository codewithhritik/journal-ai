"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Dummy API functions (replace with actual API calls later)
const fetchQuestion = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    return {
        text: "Tell me about your experience with React.",
        audioUrl: "/path/to/audio/file.mp3", // Replace with actual audio URL
    };
};

const sendAnswer = async (audioBlob: Blob) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    console.log("Answer sent to backend");
};

export default function InterviewInterface() {
    const router = useRouter();
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isSessionEnded, setIsSessionEnded] = useState(false);
    const [isUserSpeaking, setIsUserSpeaking] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [isAISpeaking, setIsAISpeaking] = useState(false);
    const circleAnimation = useAnimation();
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const dataArray = useRef<Uint8Array | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    useEffect(() => {
        audioContext.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 256;
        dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);

        setupMediaDevices();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, []);

    const setupMediaDevices = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            const audioTrack = stream.getAudioTracks()[0];
            const videoTrack = stream.getVideoTracks()[0];
            audioTrack.enabled = !isMuted;
            videoTrack.enabled = !isVideoOff;

            const source =
                audioContext.current!.createMediaStreamSource(stream);
            source.connect(analyser.current!);

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, {
                    type: "audio/mp3",
                });
                await sendAnswer(audioBlob);
                audioChunks.current = [];
                await getNextQuestion();
            };
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };

    useEffect(() => {
        const checkAudio = () => {
            if (analyser.current && dataArray.current) {
                analyser.current.getByteFrequencyData(dataArray.current);
                const sum = dataArray.current.reduce((a, b) => a + b, 0);
                const average = sum / dataArray.current.length;
                const isSpeaking = average > 20; // Adjust this threshold as needed

                setIsUserSpeaking(isSpeaking);
                circleAnimation.start(
                    isSpeaking ? { scale: 1.2 } : { scale: 1 }
                );
            }
            animationFrameId.current = requestAnimationFrame(checkAudio);
        };

        checkAudio();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [circleAnimation]);

    useEffect(() => {
        getNextQuestion();
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        const audioTrack = videoRef.current?.srcObject?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = isMuted;
        }
    };

    const toggleVideo = () => {
        setIsVideoOff(!isVideoOff);
        const videoTrack = videoRef.current?.srcObject?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = isVideoOff;
        }
    };

    const endSession = () => setIsSessionEnded(true);

    const getNextQuestion = async () => {
        setIsAISpeaking(true);
        const question = await fetchQuestion();
        setCurrentQuestion(question.text);
        await playAudioQuestion(question.audioUrl);
        setIsAISpeaking(false);
        startRecording();
    };

    const playAudioQuestion = async (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        await audio.play();
    };

    const startRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === "inactive"
        ) {
            mediaRecorderRef.current.start();
        }
    };

    const stopRecording = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === "recording"
        ) {
            mediaRecorderRef.current.stop();
        }
    };

    const goBackHome = () => {
        router.push("/");
    };

    if (isSessionEnded) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Interview Session Ended
                    </h2>
                    <p>
                        Thank you for participating. You will receive feedback
                        shortly.
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <main className="flex-grow flex items-center justify-center relative">
                <motion.div
                    className="w-40 h-40 rounded-full bg-primary/20"
                    animate={circleAnimation}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <div className="absolute bottom-4 right-4 w-64 h-48 bg-muted rounded-lg overflow-hidden shadow-lg">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted={isMuted}
                        playsInline
                    />
                </div>
                <div className="absolute top-4 left-4 right-4 text-center">
                    <Card className="p-4">
                        <p className="text-lg font-semibold">
                            {currentQuestion}
                        </p>
                    </Card>
                </div>
            </main>
            <footer className="p-6 flex justify-center space-x-6">
                <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={toggleMute}
                    disabled={isAISpeaking}
                >
                    {isMuted ? (
                        <MicOff className="h-8 w-8" />
                    ) : (
                        <Mic className="h-8 w-8" />
                    )}
                </Button>
                <Button
                    variant={isVideoOff ? "destructive" : "secondary"}
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={toggleVideo}
                >
                    {isVideoOff ? (
                        <VideoOff className="h-8 w-8" />
                    ) : (
                        <Video className="h-8 w-8" />
                    )}
                </Button>
                <Button
                    variant="destructive"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={endSession}
                >
                    <PhoneOff className="h-8 w-8" />
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={goBackHome}
                >
                    <ArrowLeft className="h-8 w-8" />
                </Button>
            </footer>
        </div>
    );
}
