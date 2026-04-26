import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useMutation } from '@tanstack/react-query';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // כאן אנחנו מגדירים את הפעולה מול פיירבייס בעזרת React Query
  const loginMutation = useMutation({
    mutationFn: async () => {
      // 1. שולחים את המייל והסיסמה לפיירבייס
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. איזה יופי! התחברנו. עכשיו אנחנו מבקשים את "צמיד ה-VIP" (הטוקן) שלנו
      const token = await userCredential.user.getIdToken();
      return token;
    },
    onSuccess: (token) => {
      console.log("🎉 ההתחברות הצליחה! הנה הטוקן שלך:");
      console.log(token);
      navigate('/dashboard'); // הקסם שמעביר אותנו מסך!
    },
    onError: (error: any) => {
      console.error("שגיאה בהתחברות:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(); // מפעילים את הפונקציה שמוגדרת למעלה
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bg="gray.50">
      <Box bg="white" p={8} rounded="md" shadow="sm" width="100%" maxW="sm" border="1px solid" borderColor="gray.200">
        <VStack as="form" onSubmit={handleSubmit} gap={5} align="stretch">
          <Heading size="md" textAlign="center" color="gray.800" mb={2}>
            כניסה למערכת
          </Heading>
          
          <Input 
            type="email" 
            placeholder="אימייל" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            bg="white"
            borderColor="gray.300"
          />
          
          <Input 
            type="password" 
            placeholder="סיסמה" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            bg="white"
            borderColor="gray.300"
          />
          
          <Button 
            type="submit" 
            bg="blue.600" 
            color="white" 
            _hover={{ bg: 'blue.700' }}
            size="lg" 
            disabled={loginMutation.isPending}
            mt={2}
          >
            {loginMutation.isPending ? 'מתחבר...' : 'התחברות'}
          </Button>
          
          {loginMutation.isError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              פרטי ההתחברות אינם נכונים.
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
}