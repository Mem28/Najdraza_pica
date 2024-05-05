import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicaService } from '../_services/pica.service';
import { Pice } from '../_modeli/pice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pice',
  templateUrl: './pice.component.html',
  styleUrls: ['./pice.component.css']
})
export class PiceComponent implements OnInit{

  pice: any;
  piceID: string = '';

  constructor(private route: ActivatedRoute, private piceService: PicaService, 
    private toasterService: ToastrService){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.piceID = params['id'];
      this.piceService.dohvatiPicePoId(this.piceID).subscribe({
        next: response => {
          console.log(response);
          this.pice = response;
          console.log(this.pice);
        },
        error: error => {
          console.error(error);
        }
      })

    });
  }

  spremiPice(){
    this.piceService.azurirajPice(this.pice).subscribe({
      next: response => {
        this.toasterService.success("Piće ažurirano");
      },
      error: error => {
        console.error(error);
      }
    })
  }
}
