// src/api/employeeApi.ts
import { auth } from '../config/firebase';

const API_BASE_URL = 'http://practicom-api-500950417142.us-central1.run.app/api/v1';

// פונקציית עזר קטנה להבאת הטוקן של פיירבייס
const getAuthHeaders = async () => {
  const token = await auth.currentUser?.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const matchRoleApi = async (data: { name: string; phone: string; assignedRole: string }) => {
  const response = await fetch(`${API_BASE_URL}/match-role`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'שגיאה בשמירת שיוך התפקיד');
  }
  return response.json();
};

export const managerSummaryApi = async (data: { employee_name: string; strengths: string[]; concerns_or_gaps: string[]; manager_tip: string }) => {
  const response = await fetch(`${API_BASE_URL}/manager-summary`, {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorMsg = errorData.errors ? errorData.errors.join('\n') : 'שגיאה בשליחת הסיכום';
    throw new Error(errorMsg);
  }
  return response.json();
};