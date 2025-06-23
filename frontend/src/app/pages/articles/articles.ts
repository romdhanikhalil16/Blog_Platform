import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/articles')
      .subscribe(data => this.articles = data);
  }

  open(articleId: string) {
    this.router.navigate(['/articles', articleId]);
  }
}
