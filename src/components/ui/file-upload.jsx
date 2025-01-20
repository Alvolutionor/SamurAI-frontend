function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs;
  } else {
    return rhsFn();
  }
}
("use client");

import {
  Button,
  FileUpload as ChakraFileUpload,
  Icon,
  IconButton,
  Span,
  Text,
  useFileUploadContext,
  useRecipe,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import * as React from "react";
import { LuFile, LuUpload, LuX } from "react-icons/lu";
import "../../../assets/css/fileUploader.css";
import { useEffect } from "react";
import { sendFiles } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";
export const FileUploadRoot = React.forwardRef(function FileUploadRoot(
  props,
  ref
) {
  const { children, inputProps, ...rest } = props;
  return (
    <ChakraFileUpload.Root {...rest}>
      <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
      {children}
    </ChakraFileUpload.Root>
  );
});

export const FileUploadDropzone = React.forwardRef(function FileUploadDropzone(
  props,
  ref
) {
  const { children, label, description, ...rest } = props;
  return (
    <ChakraFileUpload.Dropzone ref={ref} {...rest}>
      <Icon fontSize="xl" color="fg.muted">
        <LuUpload />
      </Icon>
      <ChakraFileUpload.DropzoneContent>
        <div>{label}</div>
        {description && <Text color="fg.muted">{description}</Text>}
      </ChakraFileUpload.DropzoneContent>
      {children}
    </ChakraFileUpload.Dropzone>
  );
});

const FileUploadItem = React.forwardRef(function FileUploadItem(props, ref) {
  const { file, showSize, clearable } = props;
  return (
    <ChakraFileUpload.Item file={file} ref={ref}>
      <ChakraFileUpload.ItemPreview asChild>
        <Icon fontSize="lg" color="fg.muted">
          <LuFile />
        </Icon>
      </ChakraFileUpload.ItemPreview>

      {showSize ? (
        <ChakraFileUpload.ItemContent>
          <ChakraFileUpload.ItemName />
          <ChakraFileUpload.ItemSizeText />
        </ChakraFileUpload.ItemContent>
      ) : (
        <ChakraFileUpload.ItemName flex="1" />
      )}

      {clearable && (
        <ChakraFileUpload.ItemDeleteTrigger asChild>
          <IconButton variant="ghost" color="fg.muted" size="xs">
            <LuX />
          </IconButton>
        </ChakraFileUpload.ItemDeleteTrigger>
      )}
    </ChakraFileUpload.Item>
  );
});

export const FileUploadList = React.forwardRef(function FileUploadList(
  props,
  ref
) {
  const { showSize, clearable, files, ...rest } = props;

  const fileUpload = useFileUploadContext();
  const acceptedFiles = _nullishCoalesce(files, () => fileUpload.acceptedFiles);
  if (acceptedFiles.length === 0) return null;
  // fileUpload.setFiles([new File([''], 'test.jpg', { type: 'image/jpg' })])
  // console.log(acceptedFiles)

  return (
    <ChakraFileUpload.ItemGroup ref={ref} {...rest}>
      {acceptedFiles.map((file) => (
        <FileUploadItem
          key={file.name}
          file={file}
          showSize={showSize}
          clearable={clearable}
        />
      ))}
    </ChakraFileUpload.ItemGroup>
  );
});

export const FileInput = React.forwardRef(function FileInput(props, ref) {
  const inputRecipe = useRecipe({ key: "input" });
  const [recipeProps, restProps] = inputRecipe.splitVariantProps(props);
  const { placeholder = "Select file(s)", ...rest } = restProps;

  return (
    <ChakraFileUpload.Trigger asChild>
      <Button
        unstyled
        py="0"
        ref={ref}
        {...rest}
        css={[inputRecipe(recipeProps), props.css]}
      >
        <ChakraFileUpload.Context>
          {({ acceptedFiles }) => {
            if (acceptedFiles.length === 1) {
              return <span>{acceptedFiles[0].name}</span>;
            }
            if (acceptedFiles.length > 1) {
              return <span>{acceptedFiles.length} files</span>;
            }
            return <Span color="fg.subtle">{placeholder}</Span>;
          }}
        </ChakraFileUpload.Context>
      </Button>
    </ChakraFileUpload.Trigger>
  );
});
const sliceFile = function(file,size) {
  if (!file) {
    console.error('no file')
    return
  }
  const chunkSize = 20 * 1024 * 1024
  const totalSize = file.size
  let curIndex = 0
  let chunkArray = []
  console.log(file)
  let chunkNum = Math.floor(totalSize / chunkSize);
  let order = 0
  while (curIndex <= totalSize) {
    
    const startIndex = curIndex
    const endIndex = startIndex + chunkSize
    console.log(startIndex)
    console.log(endIndex)
    chunkArray.push({
      order,
      total:chunkNum,
      fileName: file.name,
      type: file.type,
      chunk: file.slice(startIndex, endIndex)
    })
    curIndex += chunkSize
    order += 1
  }
  console.log('分片结果', chunkArray)
  return chunkArray
}

export const SubmitFiles = () => {
  const fileUpload = useFileUploadContext();
  const acceptedFiles = fileUpload.acceptedFiles;
  let navigate = useNavigate();
  const submitFiles = async() => {
  let fileChunks = []
    // const reader = new FileReader();
    //slice file to 5MB chunks if larger than 10MB
    for (let file of acceptedFiles) {
      fileChunks = fileChunks.concat(sliceFile(file, 10))
    }
    console.log(fileChunks)
    await Promise.all(fileChunks.map((chunk) => {
      var formData = new FormData();
      for (let attribute in chunk) {
        formData.append(attribute, chunk[attribute])
      }
      const tasks = '{}'
      const parsedTasks = JSON.parse(tasks);

      parsedTasks[chunk['fileName']] = { 'status': 'uploading', 'progress': '--', 'link': null }
      localStorage.setItem("tasks", JSON.stringify(parsedTasks));
  
      sendFiles(formData)
    }));
    navigate('./progress')
    
  };
  
  return (
    <Button
      onClick={submitFiles}
      colorPalette="teal"
      variant="solid"
      width="200px"
      mr={0}
      mt={2}
      style={{ float: "right" }}
    >
      Next
    </Button>
  );
};

export const FileUploadLabel = ChakraFileUpload.Label;
export const FileUploadClearTrigger = ChakraFileUpload.ClearTrigger;
export const FileUploadTrigger = ChakraFileUpload.Trigger;
