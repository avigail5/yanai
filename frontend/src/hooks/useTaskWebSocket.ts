// src/hooks/useTaskWebSocket.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';

export const useTaskWebSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('🟢 מחובר ל-WebSocket ב-NestJS!');
    });

    socket.on('message', (data: { type: string; payload: any }) => {
      if (data.type === 'TASK_CREATED') {
        const newTaskFeature = data.payload;

        queryClient.setQueryData(['tasks'], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            features: [newTaskFeature, ...oldData.features],
          };
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};