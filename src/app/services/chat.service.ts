import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api_url = 'http://localhost:8000/get_answer'

  constructor(private http: HttpClient) { }



  getChatResponse(question: string) {
    const body = { question: question }; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.api_url, body, { headers: headers });
  }

  saveHistory(hisotry: any){
    const historyString = JSON.stringify(hisotry)
    localStorage.setItem('historialLabor', historyString)
  }
}
  
  // Simular una respuesta del backend
  // const simulatedResponses: any = {
  //   "¿Cuál es la duración máxima de la jornada laboral?": "La duración máxima es de 8 horas diarias y 48 horas semanales.",
  //   "¿Qué deben pagarme en la liquidación cuando me despiden?": "En la liquidación se deben incluir salarios pendientes, vacaciones no gozadas, indemnización por despido, entre otros conceptos."
  // };
  // const response: any = simulatedResponses[question]! || 'Lo siento, no tengo una respuesta para esa pregunta en este momento.';
  // return of(response);


