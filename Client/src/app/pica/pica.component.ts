import { Component, OnInit } from '@angular/core';
import { PicaService } from '../_services/pica.service';
import { Pice } from '../_modeli/pice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pica',
  templateUrl: './pica.component.html',
  styleUrls: ['./pica.component.css']
})
export class PicaComponent implements OnInit{

  novoPice = {
    naziv: '',
    ocjena: 5,
    sastojci: ''
  }
  pica: Pice[] = [];

  constructor(private piceService: PicaService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.dohvatiSvaPica();
  }

  dohvatiSvaPica(){
    this.pica = [];
    this.piceService.dohvatiSvaPica().subscribe({
      next: response => {
        response.map((item: Pice) => {
          this.pica.push(item);
        });
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  obrisiPice(pice: Pice){
    console.log(pice);
    this.piceService.obrisiPice(pice.id).subscribe({
      next: response => {
        this.toastrService.success("Obrisano");
        this.dohvatiSvaPica();
      },
      error: error => {
        console.error(error);
      }
    })
  }

  spremiNovoPice(){
    this.piceService.spremiNovoPice(this.novoPice).subscribe({
      next: response => {
        this.novoPice = {
          naziv: '',
          ocjena: 0,
          sastojci: ''
        };
        this.toastrService.success("Piće spremljeno.");
        this.dohvatiSvaPica();
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
