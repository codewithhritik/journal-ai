"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Socket, io } from "socket.io-client";
import { Mic, MicOff, PhoneOff, Video, VideoOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuestionResponse {
    status: boolean;
    id: number;
    text: string;
    audioUrl: string;
}

interface MediaState {
    isMuted: boolean;
    isVideoOff: boolean;
    isUserSpeaking: boolean;
    isAISpeaking: boolean;
}

export default function InterviewInterface() {
    const router = useRouter();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [mediaState, setMediaState] = useState<MediaState>({
        isMuted: true,
        isVideoOff: true,
        isUserSpeaking: false,
        isAISpeaking: false
    });
    const [isSessionEnded, setIsSessionEnded] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionResponse>({
        status: false,
        id: 0,
        text: "",
        audioUrl: "",
    });

    // Refs
    const circleAnimation = useAnimation();
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const dataArray = useRef<Uint8Array | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    // Socket setup
    useEffect(() => {
        const socketInstance = io('http://localhost:5000');
        
        const handleConnect = () => console.log('Connected to socket server');
        socketInstance.on('connect', handleConnect);
        
        socketInstance.emit('request_question');

        const handleQuestion = (question: QuestionResponse) => {
            if(question.status) {
                setCurrentQuestion(question);
            }
        };
        socketInstance.on("question", handleQuestion);
        
        setSocket(socketInstance);
        
        return () => {
            socketInstance.off('connect', handleConnect);
            socketInstance.off('question', handleQuestion);
            socketInstance.disconnect();
        };
    }, []);

    // Media setup
    useEffect(() => {
        const initializeMedia = async () => {
            try {
                audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                analyser.current = audioContext.current.createAnalyser();
                analyser.current.fftSize = 256;
                dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);

                await setupMediaDevices();
            } catch (err) {
                console.error("Error initializing media:", err);
            }
        };

        initializeMedia();

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
            audioTrack.enabled = !mediaState.isMuted;
            videoTrack.enabled = !mediaState.isVideoOff;

            const source = audioContext.current!.createMediaStreamSource(stream);
            source.connect(analyser.current!);

            setupMediaRecorder(stream);
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
    };

    const setupMediaRecorder = (stream: MediaStream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
            await sendAnswer(audioBlob);
            audioChunks.current = [];
            playNextQuestion();
        };
    };

    const sendAnswer = async (audioBlob: Blob) => {
        console.log("Sending answer...");
        if (socket) {
            const reader = new FileReader();
            reader.onloadend = () => {
                socket.emit("give_answer", reader.result as string);
            };
            reader.readAsDataURL(audioBlob);
        }
    };

    const toggleMute = useCallback(() => {
        setMediaState(prev => {
            const newIsMuted = !prev.isMuted;
            const audioTrack = videoRef.current?.srcObject?.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !newIsMuted;
            }
            return { ...prev, isMuted: newIsMuted };
        });
    }, []);

    const toggleVideo = useCallback(() => {
        setMediaState(prev => {
            const newIsVideoOff = !prev.isVideoOff;
            const videoTrack = videoRef.current?.srcObject?.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !newIsVideoOff;
            }
            return { ...prev, isVideoOff: newIsVideoOff };
        });
    }, []);

    const playNextQuestion = async () => {
        setMediaState(prev => ({ ...prev, isAISpeaking: true }));
        if (currentQuestion.audioUrl) {
            await playAudioQuestion(currentQuestion.audioUrl);
        }
        setMediaState(prev => ({ ...prev, isAISpeaking: false }));
        startRecording();
    };

    const playAudioQuestion = async (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        await audio.play();
    };

    const startRecording = () => {
        if (mediaRecorderRef.current?.state === "inactive") {
            mediaRecorderRef.current.start();
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current?.state === "recording") {
            mediaRecorderRef.current.stop();
        }
    };

    if (isSessionEnded) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Interview Session Ended</h2>
                    <p>Thank you for participating. You will receive feedback shortly.</p>
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
                        muted={mediaState.isMuted}
                        playsInline
                    />
                </div>
                <div className="absolute top-4 left-4 right-4 text-center">
                    <Card className="p-4">
                        <p className="text-lg font-semibold">{currentQuestion.text}</p>
                    </Card>
                </div>
            </main>
            <footer className="p-6 flex justify-center space-x-6">
                <Button
                    variant={mediaState.isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={toggleMute}
                    disabled={mediaState.isAISpeaking}
                >
                    {mediaState.isMuted ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                </Button>
                <Button
                    variant={mediaState.isVideoOff ? "destructive" : "secondary"}
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={toggleVideo}
                >
                    {mediaState.isVideoOff ? <VideoOff className="h-8 w-8" /> : <Video className="h-8 w-8" />}
                </Button>
                <Button
                    variant="destructive"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={() => setIsSessionEnded(true)}
                >
                    <PhoneOff className="h-8 w-8" />
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="h-8 w-8" />
                </Button>
            </footer>
        </div>
    );
}