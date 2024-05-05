import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pice } from '../_modeli/pice';

@Injectable({
  providedIn: 'root'
})
export class PicaService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  dohvatiSvaPica(){
    return this.http.get<Pice[]>(this.baseUrl + 'pica');
  }

  dohvatiPicePoId(id: any){
    return this.http.get<Pice>(this.baseUrl + 'pica/' + id);
  }

  spremiNovoPice(model: any){
    return this.http.post(this.baseUrl + 'pica', model);
  }

  obrisiPice(id: number){
    return this.http.delete(this.baseUrl + 'pica/'+id);
  }

  azurirajPice(model: any){
    return this.http.put(this.baseUrl + 'pica/'+ model.id, model);
  }
}
