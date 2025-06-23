import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = 'http://localhost:5000/api/auth';
    private token = new BehaviorSubject<string | null>(null);
    role = new BehaviorSubject<string | null>(null);

    constructor(private http: HttpClient) { }

    login(credentials: any) {
        return this.http.post<any>(`${this.baseUrl}/login`, credentials)
            .subscribe(res => {
                this.token.next(res.accessToken);
                this.role.next(res.role);
            });
    }

    register(data: any) {
        return this.http.post(`${this.baseUrl}/register`, data);
    }

    getToken() {
        return this.token.value;
    }
}
