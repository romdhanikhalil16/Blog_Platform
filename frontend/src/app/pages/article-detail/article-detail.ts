import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketService } from './../../core/socket.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  comments: any[] = [];
  newComment = '';
  articleId: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:5000/api/articles/${this.articleId}`)
      .subscribe(article => this.article = article);

    this.http.get<any[]>(`http://localhost:5000/api/comments/${this.articleId}`)
      .subscribe(data => this.comments = data);

    this.socket.joinArticle(this.articleId);
    this.socket.onComment(comment => this.comments.push(comment));
  }

  sendComment() {
    this.http.post(`http://localhost:5000/api/comments`, {
      content: this.newComment,
      article: this.articleId
    }).subscribe();
    this.newComment = '';
  }
}
