import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/admin/users')
      .subscribe(users => this.users = users);
  }

  updateRole(userId: string, role: string) {
    this.http.put(`http://localhost:5000/api/admin/roles/${userId}`, { role })
      .subscribe(() => alert('Updated!'));
  }
}
