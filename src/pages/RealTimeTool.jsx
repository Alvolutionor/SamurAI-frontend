import React, { useState } from "react";
import Navbar from "../components/navbar";
import { Box, Heading, Button, Text, VStack, Input } from "@chakra-ui/react";

const SpeechToTextPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new (window.webkitSpeechRecognition ||
      window.SpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      setError(`Error occurred: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    window.SpeechRecognition && window.SpeechRecognition.stop();
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Box
        maxW="lg"
        mx="auto"
        mt={8}
        p={6}
        bg="gray.50"
        rounded="lg"
        shadow="md"
      >
        <Heading mb={4} color="teal.500" textAlign="center">
          Speech to Text Tool
        </Heading>

        <VStack spacing={4}>
          <Button
            colorScheme={isListening ? "red" : "teal"}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </Button>

          <Box
            w="full"
            h="150px"
            p={4}
            bg="white"
            rounded="md"
            border="1px"
            borderColor="gray.300"
            overflowY="auto"
          >
            {transcript ? (
              <Text fontSize="lg">{transcript}</Text>
            ) : (
              <Text color="gray.500">Your speech will appear here...</Text>
            )}
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <Input
            placeholder="Transcription appears here"
            value={transcript}
            readOnly
            variant="filled"
          />
        </VStack>
      </Box>
    </Box>
  );
};

export default SpeechToTextPage;
