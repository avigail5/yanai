import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskWebsocketEvent } from './task-events.enum';
import { RawTaskResult } from './tasks.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class TasksGateway {
  @WebSocketServer()
  server!: Server;

  notifyTaskCreated(task: RawTaskResult) {
    const taskFeature = {
      type: 'Feature',
      geometry: task.location,
      properties: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      },
    };

    this.server.emit('message', {
      type: TaskWebsocketEvent.TASK_CREATED,
      payload: taskFeature,
    });
  }
}