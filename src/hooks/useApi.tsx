import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../api";

// CRUD uchun umumiy hook
export const useApi = <T extends { id: string }>(urls: {
  getUrl: string;
  postUrl: string;
  deleteUrl: string;
  updateUrl: string;
}) => {
  const queryClient = useQueryClient();

  // 📌 GET — Ma'lumotlarni olish
  const { data, error, isLoading } = useQuery<T[]>({
    queryKey: [urls.getUrl],
    queryFn: async () => {
      const response = await api.get<T[]>(urls.getUrl);
      return response.data;
    },
    retry: () => {
      message.error("Ошибка загрузки данных!");
      return false; // Return false to stop retrying
    },
  });

  // 📌 POST — Yangi ma'lumot qo'shish
  const createMutation = useMutation({
    mutationFn: async (newData: Partial<T>) => {
      const response = await api.post<T>(urls.postUrl, newData);
      return response.data;
    },
    onSuccess: () => {
      message.success("Данные успешно добавлены!");
      queryClient.invalidateQueries({ queryKey: [urls.getUrl] });
    },
    onError: () => {
      message.error("Ошибка при добавлении данных!");
    },
  });

  // 📌 PUT — Ma'lumotni yangilash
  const updateMutation = useMutation({
    mutationFn: async ({ updatedData }: {updatedData: Partial<T> }) => {
      const response = await api.put<T>(`${urls.updateUrl}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      message.success("Данные успешно обновлены!");
      queryClient.invalidateQueries({ queryKey: [urls.getUrl] });
    },
    onError: () => {
      message.error("Ошибка при обновлении данных!");
    },
  });

  // 📌 DELETE — Ma'lumotni o‘chirish
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`${urls.deleteUrl}/by-id`, {
        data:  id ,
      });
    },
    onSuccess: () => {
      message.success("Данные успешно удалены!");
      queryClient.invalidateQueries({ queryKey: [urls.getUrl] });
    },
    onError: () => {
      message.error("Ошибка при удалении данных!");
    },
  });

  return {
    data,
    error,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
