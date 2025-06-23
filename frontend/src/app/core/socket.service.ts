import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io('http://localhost:5000', { withCredentials: true });
    }

    joinArticle(articleId: string) {
        this.socket.emit('joinArticle', articleId);
    }

    sendComment(comment: any) {
        this.socket.emit('newComment', comment);
    }

    onComment(callback: (comment: any) => void) {
        this.socket.on('commentAdded', callback);
    }
}
