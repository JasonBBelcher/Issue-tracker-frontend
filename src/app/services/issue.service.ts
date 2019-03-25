import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/Issue';

@Injectable()
export class IssueService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080';
  }
  // returns all users issues globally
  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.baseUrl}/api/issues`);
  }

  // returns only signed in users own issues
  getAllUserIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.baseUrl}/api/issues/user`);
  }

  getUserIssue(id): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/api/issues/user/${id}`);
  }

  editUserIssue(id, body): Observable<Issue> {
    return this.http.patch<Issue>(
      `${this.baseUrl}/api/issues/user/${id}`,
      body
    );
  }

  createUserIssue(body): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/api/issues/user`, body);
  }
}
