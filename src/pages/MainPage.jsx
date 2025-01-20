import FileUploader from "../components/fileUploader";
import Navbar from "../components/navbar";
import { Box, Button, Text, useFileUploadContext } from "@chakra-ui/react";
const MainPage = () => {
  return (
    <Box height={"100vh"} bg={"gray.50"} color={"gray.500"} width={"100vw"}>
      <Navbar></Navbar>
      <Box width="50vw" mx="auto" textAlign={"center"}>
        <div
          style={{ fontSize:"30px", marginTop: "30px", marginBottom: "30px", fontFamily: "'Orbitron', sans-serif",  fontWeight:"bold"}}
        >
          SamurAI – Mastering Transcription & Summaries with AI Precision
        </div>

              <FileUploader width={"1000px"} height={"600px"} maxFiles={10}></FileUploader>

      </Box>
    </Box>
  );
};

export default MainPage;
