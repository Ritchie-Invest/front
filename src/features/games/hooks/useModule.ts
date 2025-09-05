import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../auth/store/authStore';
import { config } from '../../../lib/config';
import { GameModule } from '../models/module';

const fetchModule = async (moduleId: string, token?: string): Promise<GameModule> => {
  const res = await fetch(`${config.API_URL}/modules/${moduleId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Module non trouvé');
  return res.json();
};

export const useModule = (lessonId: string, moduleId: string) => {
  const token = useAuthStore((s) => s.accessToken) ?? undefined;
  return useQuery({
    queryKey: ['module', moduleId],
    queryFn: () => fetchModule(moduleId, token),
    enabled: !!moduleId,
  });
};
