import { Component } from '@angular/core';
import { ApiService } from '../gtp-service.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import * as docx from 'docx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-text',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './ai-text.component.html',
  styleUrl: './ai-text.component.css'
})
export class AiTextComponent {
  constructor(private apiService: ApiService) { }

  getinput: string = '';
  output: string = '';
  copyButtonText: string = '📋';

  isSubmitting:boolean=false;
  onSubmit(form: any): void {
    if (form.invalid) {
      alert('Please fill to get Results.');
      return;
    }
    this.isSubmitting=true;
    const prompt = this.getinput;
    this.apiService.submitPrompt(prompt).subscribe({
      next: (response) => {
        this.isSubmitting=false;
        this.output = response.choices?.[0]?.message?.content;
      },
      error: (error) => {
        alert('Error submitting prompt. Check console for details.');
        console.error('Error:', error);
      },
    });
  }

  onClear(): void {
    this.getinput = '';
  }

  oncopy(): void {
    if (!this.output) {
      this.copyButtonText = 'Nothing to copy';
      setTimeout(() => {
        this.copyButtonText = '📋';
      }, 2000);
      return;
    }

    navigator.clipboard.writeText(this.output).then(() => {
      this.copyButtonText = 'Text copied';
      setTimeout(() => {
        this.copyButtonText = '📋';
      }, 2000);
    });
  }

  downloadAsPDF(): void {
    const doc = new jsPDF();
    if (!this.output) {
      alert("Nothing to Download");
      return;
    }
    doc.text(this.output, 10, 10);
    doc.save('output.pdf');
  }

  downloadAsWord(): void {
    if (!this.output) {
      alert("Nothing to Download");
      return;
    }
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: this.output.split('\n').map((line: string) => {
            return new docx.Paragraph({
              children: [new docx.TextRun(line)],
            });
          }),
        },
      ],
    });

    // Create the file blob
    docx.Packer.toBlob(doc).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'output.docx';
      link.click();
    });
  }
}