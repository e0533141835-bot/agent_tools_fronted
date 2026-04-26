import { useState } from 'react';
import { Box, Button, Input, Textarea, VStack, Text, Flex } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { managerSummaryApi } from '../api/employeeApi';

interface Props {
  name: string;
  onSuccess: () => void;
}

export default function ManagerSummaryForm({ name, onSuccess }: Props) {
  const [strengths, setStrengths] = useState('');
  const [concerns, setConcerns] = useState('');
  const [managerTip, setManagerTip] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      const strengthsArray = strengths.split(',').map(s => s.trim()).filter(s => s !== '');
      const concernsArray = concerns.split(',').map(c => c.trim()).filter(c => c !== '');
      return managerSummaryApi({ 
        employee_name: name, 
        strengths: strengthsArray, 
        concerns_or_gaps: concernsArray, 
        manager_tip: managerTip 
      });
    },
    onSuccess: () => {
      alert('📧 הסיכום נשלח בהצלחה לתיבת המייל!');
      onSuccess();
    },
    onError: (err: any) => alert('שגיאה בשליחת המייל: ' + err.message)
  });

  return (
    <Box bg="white" p={8} rounded="2xl" shadow="xl" border="1px solid" borderColor="purple.50">
      <VStack gap={5} align="stretch">
        <Flex align="center" gap={2} mb={2}>
          <Text color="gray.500">סיכום עבור:</Text>
          <Box bg="purple.50" px={3} py={1} rounded="full">
            <Text color="#4a306d" fontWeight="bold">{name}</Text>
          </Box>
        </Flex>

        <Box>
          <Text color="gray.600" fontSize="sm" mb={2}>חוזקות בולטות</Text>
          <Input placeholder="הפרידי בפסיקים" value={strengths} onChange={(e) => setStrengths(e.target.value)} bg="gray.50" />
        </Box>

        <Box>
          <Text color="gray.600" fontSize="sm" mb={2}>נקודות לשיפור / פערים</Text>
          <Input placeholder="הפרידי בפסיקים" value={concerns} onChange={(e) => setConcerns(e.target.value)} bg="gray.50" />
        </Box>

        <Box>
          <Text color="gray.600" fontSize="sm" mb={2}>טיפ ניהולי אישי</Text>
          <Textarea placeholder="מה הטיפ שלך להצלחת העובד/ת?" value={managerTip} onChange={(e) => setManagerTip(e.target.value)} bg="gray.50" rows={4} />
        </Box>

        <Button 
          bgGradient="to-r" 
          gradientFrom="#4a306d" 
          gradientTo="#b3446c"
          color="white" 
          size="lg"
          _hover={{ opacity: 0.9, transform: 'translateY(-2px)' }}
          onClick={() => mutation.mutate()}
          loading={mutation.isPending}
          disabled={!strengths || !managerTip}
          mt={2}
        >
          שלח סיכום במייל
        </Button>
      </VStack>
    </Box>
  );
}