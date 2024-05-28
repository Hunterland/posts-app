
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { Comment } from './comment.service';

// Defini��o da interface Post e suas propriedades
export interface Post {
  id: number;
  title: string;
  body: string;
  // Armazena os coment�rios associados aos posts.
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // URLs da API para posts e coment�rios
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsApiUrl = 'https://jsonplaceholder.typicode.com/comments';

  // Armazena os posts carregados em mem�ria
  private posts: Post[] = [];

  // Construtor que injeta o HttpClient para fazer requisi��es HTTP
  constructor(private http: HttpClient) {}

  // M�todo para obter posts, incluindo seus coment�rios
  getPosts(): Observable<Post[]> {
    // Retorna os posts em mem�ria se j� estiverem carregados
    if (this.posts.length) {
      return of(this.posts);
    }
    // Faz uma requisi��o para obter os posts
    return this.http.get<Post[]>(this.apiUrl).pipe(
      // Para cada post, obt�m seus coment�rios
      switchMap(posts => {
        const commentRequests = posts.map(post =>
          this.http.get<Comment[]>(`${this.commentsApiUrl}?postId=${post.id}`).pipe(
            // Garante que cada post tenha seus coment�rios associados
            map(comments => ({ ...post, comments: comments || [] }))
          )
        );
        // Combina todas as requisi��es de coment�rios
        return forkJoin(commentRequests).pipe(
          // Armazena os posts com coment�rios em mem�ria
          tap(postsWithComments => this.posts = postsWithComments)
        );
      }),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  // M�todo para adicionar um novo post
  addPost(post: Post): Observable<Post> {
    // Faz uma requisi��o POST para adicionar o post
    return this.http.post<Post>(this.apiUrl, post).pipe(
      // Adiciona o novo post � lista em mem�ria
      tap(newPost => this.posts.push(newPost)),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Post>('addPost'))
    );
  }

  // M�todo para atualizar um post existente
  updatePost(post: Post): Observable<any> {
    const url = `${this.apiUrl}/${post.id}`;
    // Faz uma requisi��o PUT para atualizar o post
    return this.http.put(url, post).pipe(
      // Atualiza o post na lista em mem�ria
      tap(() => {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = post;
        }
      }),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<any>('updatePost'))
    );
  }

  // M�todo para deletar um post
  deletePost(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    // Faz uma requisi��o DELETE para remover o post
    return this.http.delete<Post>(url).pipe(
      // Remove o post da lista em mem�ria
      tap(() => {
        this.posts = this.posts.filter(p => p.id !== id);
      }),
      // Trata poss�veis erros na requisi��o
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  // M�todo privado para tratar erros em opera��es HTTP
  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loga o erro no console
      return of(result as T); // Retorna um resultado vazio para manter a aplica��o funcionando
    };
  }
}
