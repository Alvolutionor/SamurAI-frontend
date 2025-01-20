import React, { useState } from "react";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  SubmitFiles
} from "@/components/ui/file-upload";
import { Flex, Box, Text, Center, useFileUploadContext } from "@chakra-ui/react";
// A file uploader:
// Slice file to pieces with chuckSize
// Restrict maxium file upload size
//
// Enable user continue from breakpoint return
const FileUploader = ({ chuckSize, maxSize, width, height, maxFiles }) => {
  const [file, setFile] = useState();

  return (

      <FileUploadRoot
        w={width}
        alignItems="stretch"
        maxFiles={maxFiles}
      style={{ display: "inline-block", }}
      accept={[' .mp4, .mpeg, .mpga, .m4a, .wav, .webm','.png']}//, 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'
      
      onFileAccept={() => {  }}
      >
        <Flex direction={"row"} style={{ borderStyle: "solid",
          borderWidth: "2px", 
          borderRadius: "5px",overflow:"hidden"}}>
          <Box
            w="3/4"
            style={{
              borderStyle: "solid",
              borderRightWidth: "1px",
              height: height,
              alignItems: "center",
            }}
          >
            <Flex
              w="3/4"
              style={{
                borderStyle: "solid",
                borderRightWidth: "1px",
                height: "20%",
                width: "100%",
                flexDirection: "column",
                justifyContent:"center"
              }}
            >
              <Text
                textStyle="md"
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Select files, 10 max. Format allowed: .mp4, .mpeg, .mpga, .m4a, .wav, .webm. Files with same name will be ignored. File name can not contain _.
              </Text>
            </Flex>
            <FileUploadDropzone
              style={{ padding: "10px", height: "80%" }}
              label="Drag and drop here to upload"
              description=""
            />
          </Box>
          <Box
          w="1/4"
          className={'fileList'} 
            style={{
              borderStyle: "solid",
              borderRightWidth: "1px",
              height: height,
              overflowY: "scroll",
            }}
          >
            <Text textStyle="md" style={{ textAlign: "center",lineHeight:"45px"}}>
              File uploaded
            </Text>
            <FileUploadList  showSize = {true} clearable={true} />
          </Box>
        </Flex>
        <SubmitFiles></SubmitFiles>

      </FileUploadRoot>
  );
};

export default FileUploader;
