import { axiosInstance } from '../../../lib/api/axios';
import { CompletionStats } from '../models/completion';

export async function getCompletionStats(
  lessonId: string,
  token?: string,
): Promise<CompletionStats> {
  const res = await axiosInstance.get<CompletionStats>(`/lessons/${lessonId}/completion`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}
