import { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { matchRoleApi } from '../api/employeeApi';

interface Props {
  name: string;
  setName: (val: string) => void;
  setIsRoleSaved: (val: boolean) => void;
}

export default function MatchRoleForm({ name, setName, setIsRoleSaved }: Props) {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const mutation = useMutation({
    mutationFn: () => matchRoleApi({ name, phone, assignedRole: role }),
    onSuccess: () => {
      setIsRoleSaved(true);
    },
    onError: (err: any) => alert('שגיאה: ' + err.message)
  });

  return (
    <Box bg="white" p={8} rounded="2xl" shadow="xl" border="1px solid" borderColor="purple.50">
      <VStack gap={5} align="stretch">
        <Box>
          <Text color="gray.600" fontSize="sm" mb={2} fontWeight="medium">שם העובד/ת</Text>
          <Input placeholder="הקלידי שם מלא" value={name} onChange={(e) => setName(e.target.value)} bg="gray.50" />
        </Box>

        <Box>
          <Text color="gray.600" fontSize="sm" mb={2} fontWeight="medium">מספר טלפון</Text>
          <Input placeholder="05X-XXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} bg="gray.50" />
        </Box>

        <Box>
          <Text color="gray.600" fontSize="sm" mb={2} fontWeight="medium">תפקיד מיועד</Text>
          <Input placeholder="למשל: מפתחת פולסטאק" value={role} onChange={(e) => setRole(e.target.value)} bg="gray.50" />
        </Box>

        <Button 
          bg="#4a306d" 
          color="white" 
          size="lg"
          _hover={{ bg: '#362252', transform: 'translateY(-2px)' }}
          onClick={() => mutation.mutate()}
          loading={mutation.isPending}
          disabled={!name || !phone || !role}
          mt={2}
        >
          שמור והמשך לסיכום
        </Button>
      </VStack>
    </Box>
  );
}