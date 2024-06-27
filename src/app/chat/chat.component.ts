import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { timestamp } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatHistory: {type: string, text: string, timestamp: Date}[] = [];

  constructor(private chatService: ChatService){}
  
  ngOnInit(): void {
    const hisotry = localStorage.getItem('historialLabor')
    if(hisotry){
      this.chatHistory = JSON.parse(hisotry)
    }
  }

  onSubmit(formData: NgForm){
    const question = formData.form.value.question;
    const cleanQuestion = this.cleanQuestion(question)
    console.log(cleanQuestion)
    const questionEntry = {type: 'user', text: question, timestamp: new Date()}
    this.chatHistory.push(questionEntry);
    
    this.chatService.getChatResponse(question).subscribe(response => {
      console.log(response)
    const responseEntry = {type: 'bot', text: response.toString(), timestamp: new Date()}
    this.chatHistory.push(responseEntry)
  })
  this.chatService.saveHistory(this.chatHistory)
    formData.reset();

  }

  cleanQuestion(question: string): string {
   const normalizedQuestion = question.toLowerCase()
    return normalizedQuestion.replace(/[^\w\s]/gi, ' ');
  }

}
