import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import "../../assets/css/ProgressPage.css";
import Navbar from "../components/navbar";
import { viewOnline } from "../utils/axios";
import { FaDownload } from "react-icons/fa6";
import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Link,
  useFileUploadContext,
} from "@chakra-ui/react";
import { GrInProgress } from "react-icons/gr";
const ProgressPage = () => {
  const [tasks, setTasks] = useState(() => {
    // 初始化状态从 localStorage 获取
    return localStorage.getItem("tasks") || "{}";
  });
  const [viewOnlineState, setViewOnlineState] = useState(null);
  const [viewOnlineContent, setviewOnlineContent] = useState(null);
  const [loadingOnline, setLoadingOnline] = useState(false);  
  let parsedTasks = JSON.parse(tasks);
  const targets = Object.keys(parsedTasks);

  console.log(viewOnlineState);
  useEffect(() => {
    parsedTasks = JSON.parse(tasks);
  }, [tasks]);
  useEffect(() => {
    const handleStorageChange = () => {
      setTasks(localStorage.getItem("tasks"));
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localstorage-update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.addEventListener("localstorage-update", handleStorageChange);
    };
  }, []);

  return (
    <Box height={"92vh"} bg={"gray.50"} color={"gray.500"} width={"100vw"}>
      <Navbar></Navbar>
      <Box height={"92vh"} width="50vw" mx="auto" textAlign={"center"}>
        <Box
          style={{
            fontSize: "30px",
            paddingBottom: "15px",
            paddingTop: "30px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          Tasks in progress
        </Box>{" "}
        <Box
          style={{
            paddingBottom: "15px",
            fontSize: "20px",
            fontFamily: "sans-serif",
          }}
        >
          Do not leave this page before the task is done !
        </Box>
        <Box
          h={"70vh"}
          width="50vw"
          mx="auto"
          textAlign={"center"}
          borderWidth={"2px"}
          borderColor={"gray"}
          borderRadius={"10px"}
          overflowY={"scroll"}
          className="progressList"
          px={5}
        >
          {targets?.map((target, index) => {
            return (
              <Box
                width={"100%"}
                borderWidth={"2px"}
                mt={"3px"}
                borderRadius={"5px"}
                borderColor={"gray.400"}
                p={2}
              >
                <Flex justify="space-between" mb={6}>
                  <Text ml={2} fontWeight={800}>
                    <Icon fontSize="xl" color="teal" pr={1}>
                      <GrInProgress />
                    </Icon>
                    Media name: {target}
                  </Text>
                  <Text style={{ textTransform: "capitalize" }}>
                    {parsedTasks[target].status} :{" "}
                    {isNaN(parsedTasks[target].progress)
                      ? parsedTasks[target].progress
                      : Number.parseFloat(parsedTasks[target].progress).toFixed(
                          2
                        ) + "%"}{" "}
                  </Text>
                </Flex>
                {!parsedTasks[target].link ? (
                  <ProgressRoot
                    height={"20px"}
                    striped
                    colorPalette={"teal"}
                    value={
                      isNaN(parsedTasks[target].progress)
                        ? parsedTasks[target].progress == "--"
                          ? 0
                          : 100
                        : parsedTasks[target].progress
                    }
                    width={"100%"}
                  >
                    <ProgressBar />
                  </ProgressRoot>
                ) : viewOnlineState === null ? (
                  loadingOnline ? (
                    <Text>loading now...</Text>
                  ) : (
                    <>
                      <Link
                        download
                        className="downlaodLink"
                        mr={4}
                        height={"20px"}
                        style={{
                          borderWidth: "2px",
                          borderRadius: "10px",
                          color: "teal",
                          borderColor: "gray.400",
                        }}
                        p={4}
                        href={`${
                          import.meta.env.VITE_BACKEND_SERVER
                        }/download?fileName=${parsedTasks[target].link[0]}`}
                      >
                        Download your video here
                        <Icon ml={4} fontSize="xxl" color="teal.500">
                          <FaDownload />
                        </Icon>
                      </Link>
                      <Link
                        download
                        className="downlaodLink"
                        height={"20px"}
                        style={{
                          borderWidth: "2px",
                          borderRadius: "10px",
                          color: "teal",
                          borderColor: "gray.400",
                        }}
                        p={4}
                        href={`${
                          import.meta.env.VITE_BACKEND_SERVER
                        }/download?fileName=${parsedTasks[target].link[1]}`}
                      >
                        Download your scripts here
                        <Icon ml={4} fontSize="xxl" color="teal.500">
                          <FaDownload />
                        </Icon>
                      </Link>
                      <button
                        className="viewOnlineButton"
                        height={"20px"}
                        style={{
                          marginLeft: "16px",
                          backgroundColor: "white",
                          borderWidth: "2px",
                          borderRadius: "10px",
                          color: "teal",
                          borderColor: "gray.400",
                          padding: 4,
                        }}
                        onClick={async () => {
                          setLoadingOnline(true);
                          console.log(index);
                          viewOnline(`${parsedTasks[target].link[1]}`).then(
                            (result) => {
                              setLoadingOnline(false);
                              setViewOnlineState(index);
                              console.log(result.data);
                              setviewOnlineContent(result.data);
                            }
                          );
                        }}
                      >
                        Click here to view Online
                      </button>
                    </>
                  )
                ) : viewOnlineState == index ? (
                  <Flex
                    style={{
                      width: "100%",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      className="viewOnlineButton"
                      height={"20px"}
                      style={{
                        width: "100px",
                        marginLeft: "0",
                        backgroundColor: "white",
                        borderWidth: "2px",
                        borderRadius: "10px",
                        color: "teal",
                        borderColor: "gray.400",
                        padding: 4,
                      }}
                      onClick={() => {
                        setViewOnlineState(null);
                      }}
                    >
                      {"<"} Go back
                    </button>
                    <Flex>
                      <Flex
                        style={{
                          width: "49%",
                          justifyContent: "flex-start",
                          marginTop: "10px",
                          flexDirection: "column",
                          marginLeft: "0",
                          backgroundColor: "white",
                          borderWidth: "2px",
                          borderRadius: "10px",
                          color: "teal",
                          borderColor: "gray.400",
                          padding: 4,
                        }}
                      >
                        <Text style={{ color: "black", marginBottom: "5px" }}>
                          Video Text
                        </Text>
                        <Text>{viewOnlineContent[0]}</Text>
                      </Flex>
                      <Flex
                        style={{
                          width: "49%",
                          justifyContent: "flex-start",
                          marginTop: "10px",
                          flexDirection: "column",
                          marginLeft: "2%",
                          backgroundColor: "white",
                          borderWidth: "2px",
                          borderRadius: "10px",
                          color: "teal",
                          borderColor: "gray.400",
                          padding: 4,
                        }}
                      >
                        <Text style={{ color: "black", marginBottom: "5px" }}>
                          Video Summary
                        </Text>
                        <Text>{viewOnlineContent[1]}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressPage;
