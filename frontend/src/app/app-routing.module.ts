import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ArticlesComponent } from './pages/articles/articles';
import { ArticleDetailComponent } from './pages/article-detail/article-detail';

// Define your routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)  // Import RouterModule with routes
  ],
  exports: [RouterModule]  // Export RouterModule so it's available app-wide
})
export class AppRoutingModule { }