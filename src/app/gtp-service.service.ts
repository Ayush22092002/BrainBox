import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  private apiEndpoint = 'https://ayushgpt.cognitiveservices.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-08-01-preview';
  private apiKey = 'DT57zoswceQEMsllYaNuiavF8YKSuf3qA2XxDu7BpxI3dwBCVbO1JQQJ99BAACYeBjFXJ3w3AAAAACOGd5Uy';
 
  constructor(private http: HttpClient) {}
 
  submitPrompt(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.apiKey,
    });
    const body = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
    };    
    return this.http.post(this.apiEndpoint, body, { headers });
  }
  
  
}