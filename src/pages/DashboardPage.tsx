import { useState } from 'react';
import { Box, Heading, Container, Text, Button, Image, VStack } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import MatchRoleForm from '../components/MatchRoleForm';
import ManagerSummaryForm from '../components/ManagerSummaryForm';
import logo from '../assets/logo.png';

export default function DashboardPage() {
  const [employeeName, setEmployeeName] = useState('');
  const [isRoleSaved, setIsRoleSaved] = useState(false);

  const resetAll = () => {
    setEmployeeName('');
    setIsRoleSaved(false);
  };

  return (
    <Box minH="100vh" bgGradient="to-br" gradientFrom="#fdfcfd" gradientTo="#fff5f7" dir="rtl" pb={12}>
      <Navbar />
      
      <Container maxW="650px" mt={4} position="relative">
        
        {/* כפתור חזרה עדין בצד */}
        {isRoleSaved && (
          <Button 
            position="absolute"
            top="0"
            left="20px"
            size="sm" 
            onClick={resetAll} 
            variant="plain" 
            color="#b3446c" 
            fontWeight="bold"
            _hover={{ color: '#4a306d' }}
          >
            ← חזרה
          </Button>
        )}

        {/* --- אזור המיתוג המרכזי --- */}
        <VStack gap={6} mb={12} align="center" width="100%">
          {/* הלוגו במלוא הדרו - גדול וממורכז */}
          <Box 
            p={4} 
            bg="white" 
            rounded="3xl" 
            shadow="sm" 
            border="1px solid" 
            borderColor="purple.50"
          >
            <Image 
              src={logo} 
              alt="Tali Match Logo" 
              h="140px" // גובה מרשים שרואים בו כל פרט
              style={{ objectFit: 'contain' }}
            />
          </Box>
          
          {/* כותרת השלב - מעוצבת ונקייה */}
          <VStack gap={1}>
            <Text 
              color="#b3446c" 
              fontSize="xs" 
              fontWeight="800" 
              letterSpacing="3px"
              textTransform="uppercase"
              opacity={0.9}
            >
              {isRoleSaved ? 'Step 02' : 'Step 01'}
            </Text>
            <Heading 
              size="2xl" 
              color="#4a306d" 
              fontWeight="900"
              textAlign="center"
            >
              {isRoleSaved ? 'סיכום מנהלים' : 'שיוך תפקיד'}
            </Heading>
            <Box h="4px" w="60px" bgGradient="to-r" gradientFrom="#4a306d" gradientTo="#b3446c" rounded="full" mt={2} />
          </VStack>
        </VStack>

        {/* הטפסים */}
        <Box 
          shadow="2xl" 
          rounded="3xl" 
          overflow="hidden"
          transition="all 0.3s"
        >
          {!isRoleSaved ? (
            <MatchRoleForm 
              name={employeeName} 
              setName={(val) => { setEmployeeName(val); setIsRoleSaved(false); }} 
              setIsRoleSaved={setIsRoleSaved} 
            />
          ) : (
            <ManagerSummaryForm 
              name={employeeName} 
              onSuccess={resetAll}
            />
          )}
        </Box>
        
      </Container>
    </Box>
  );
}