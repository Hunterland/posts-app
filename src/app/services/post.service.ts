
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { Comment } from './comment.service';

// Definição da interface Post e suas propriedades
export interface Post {
  id: number;
  title: string;
  body: string;
  // Armazena os comentários associados aos posts.
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // URLs da API para posts e comentários
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsApiUrl = 'https://jsonplaceholder.typicode.com/comments';

  // Armazena os posts carregados em memória
  private posts: Post[] = [];

  // Construtor que injeta o HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  // Método para obter posts, incluindo seus comentários
  getPosts(): Observable<Post[]> {
    // Retorna os posts em memória se já estiverem carregados
    if (this.posts.length) {
      return of(this.posts);
    }
    // Faz uma requisição para obter os posts
    return this.http.get<Post[]>(this.apiUrl).pipe(
      // Para cada post, obtém seus comentários
      switchMap(posts => {
        const commentRequests = posts.map(post =>
          this.http.get<Comment[]>(`${this.commentsApiUrl}?postId=${post.id}`).pipe(
            // Garante que cada post tenha seus comentários associados
            map(comments => ({ ...post, comments: comments || [] }))
          )
        );
        // Combina todas as requisições de comentários
        return forkJoin(commentRequests).pipe(
          // Armazena os posts com comentários em memória
          tap(postsWithComments => this.posts = postsWithComments)
        );
      }),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  // Método para adicionar um novo post
  addPost(post: Post): Observable<Post> {
    // Faz uma requisição POST para adicionar o post
    return this.http.post<Post>(this.apiUrl, post).pipe(
      // Adiciona o novo post à lista em memória
      tap(newPost => this.posts.push(newPost)),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Post>('addPost'))
    );
  }

  // Método para atualizar um post existente
  updatePost(post: Post): Observable<any> {
    const url = `${this.apiUrl}/${post.id}`;
    // Faz uma requisição PUT para atualizar o post
    return this.http.put(url, post).pipe(
      // Atualiza o post na lista em memória
      tap(() => {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = post;
        }
      }),
      // Trata possíveis erros na requisição
      catchError(this.handleError<any>('updatePost'))
    );
  }

  // Método para deletar um post
  deletePost(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    // Faz uma requisição DELETE para remover o post
    return this.http.delete<Post>(url).pipe(
      // Remove o post da lista em memória
      tap(() => {
        this.posts = this.posts.filter(p => p.id !== id);
      }),
      // Trata possíveis erros na requisição
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  // Método privado para tratar erros em operações HTTP
  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loga o erro no console
      return of(result as T); // Retorna um resultado vazio para manter a aplicação funcionando
    };
  }
}
