import React from "react";
import { Box, Flex, Link, Spacer, Button, Image} from "@chakra-ui/react";
import icon from "../../assets/img/samurai.png";
import { useState } from "react";
const Navbar = () => {
  const [signedIn,setSignedIn] = useState(false)
  return (
    <Box bg="teal.500" px={4} h="8vh">
      <Flex alignItems="center" h="100%">
        {/* Logo or Brand Name */}
        <Image src={icon} alt="samurai Icon" h="80%" pr={4} />
        <Link href="#" color="white" fontWeight="bold" fontSize="xl">
          SamurAI
        </Link>

        <Spacer />

        {/* Navigation Links */}
        <Flex gap={6} fontSize={"20px"} >
          <Link href="/" color="white" pr={4} _hover={{ textDecoration: "underline" }}>
            AI Transciption
          </Link>
          <Link href="/real-time" color="white" pr={4} _hover={{ textDecoration: "underline" }}>
            Real-time Transciption
          </Link>
          <Link href="#contact" color="white" pr={4}  _hover={{ textDecoration: "underline" }}>
            Author
          </Link>
        </Flex>

        <Spacer />
        {signedIn ? <>
        </> : <></>
        }
        <Button colorScheme="pink" size="sm" w={"120px"} ml={4} my={2} onClick={()=>setSignedIn(true)}>
        {signedIn?"Guest Access":"Sign In"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
