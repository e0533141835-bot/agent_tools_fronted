import { Flex, Button } from '@chakra-ui/react';
import { auth } from '../config/firebase';

export default function Navbar() {
  const handleLogout = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <Flex 
      as="nav" 
      bg="rgba(255, 255, 255, 0.7)" 
      backdropFilter="blur(10px)" 
      p={4} 
      px={8}
      justify="flex-end"
      align="center"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Button 
        variant="ghost" 
        color="#4a306d"
        _hover={{ bg: 'purple.50' }} 
        size="sm" 
        fontWeight="bold"
        onClick={handleLogout}
      >
        התנתקות
      </Button>
    </Flex>
  );
}