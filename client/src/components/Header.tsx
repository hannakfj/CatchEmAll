import React from 'react';
import { Box, Flex, Heading} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import headerimg from '../assets/images/header.jpg'; 
import Typewriter from "typewriter-effect";

const Header: React.FC = () => {
  const bluecolor = "blue.800";
  return (
    <Box 
      as="header"
      position="relative"
      height={'300px'}
      padding={4} 
      boxShadow="md"
      top={0}
      left={0}
      right={0}
      overflow="hidden"
    >
      <Box 
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={`url(${headerimg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        opacity={0.6}  
        zIndex={-1}  
      />
      <Flex maxWidth="1200px" margin="auto" alignItems="center" height='300px'>
        <Heading as="h1" size="3xl" color={bluecolor}>
          <Link to="/">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Pokémon<br/>")
                .pauseFor(800)
                .typeString("Don't Cache 'Em All") 
                .start();
            }}
          />
          </Link>
        </Heading>
      </Flex>
    </Box>
  );
};
export default Header;
