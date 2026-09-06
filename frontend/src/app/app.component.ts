import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HelloResponse {
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello Microservice Frontend';
  nameInput: string = '';
  responseMessage: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  sendName() {
    if (!this.nameInput || this.nameInput.trim() === '') {
      this.errorMessage = 'Please enter a name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.responseMessage = '';

    // Relative endpoint /api/hello works with Nginx proxy / ingress routing
    this.http.get<{ message: string }>(`/api/hello?name=${encodeURIComponent(this.nameInput.trim())}`)
      .subscribe({
        next: (data) => {
          this.responseMessage = data.message;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching greeting:', err);
          this.errorMessage = 'Failed to connect to backend service.';
          this.isLoading = false;
        }
      });
  }
}
