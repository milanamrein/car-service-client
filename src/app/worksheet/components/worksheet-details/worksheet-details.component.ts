import { AlertService } from '../../../shared/services/alert.service';
import { NotFound } from '../../../common/errors/not-found-error';
import { AppError } from '../../../common/errors/app-error';
import { WorksheetService } from '../../../shared/services/worksheet.service';
import { ActivatedRoute } from '@angular/router';
import { WorksheetDTO } from '../../../shared/models/worksheet';
import { Component } from '@angular/core';

@Component({
  selector: 'app-worksheet-details',
  templateUrl: './worksheet-details.component.html',
  styleUrls: ['./worksheet-details.component.css']
})
export class WorksheetDetailsComponent {

  worksheet: WorksheetDTO;
  isLoading: boolean;

  constructor(
    worksheetService: WorksheetService,
    alertService: AlertService,
    route: ActivatedRoute) {

    this.isLoading = true;
    worksheetService.get(route.snapshot.paramMap.get('id'))
      .subscribe(
        (worksheet: WorksheetDTO) => {
          this.worksheet = worksheet; 
          this.worksheet.reservation.time = 
            new Date(this.worksheet.reservation.time);
          this.isLoading = false;
        },
        (error: AppError) => {          
          if (error instanceof NotFound) {
            alertService.error('Worksheet cannot be found!');
            this.isLoading = false;
          } else throw error;
        });    
  } 
  
  /**
   * Gets the total price of the materials
   */
  get TotalPrice(): number {
    let totalPrice = 0;
    this.worksheet.materials.forEach(material => {
        totalPrice += (material.price * material.quantity);
    });

    return totalPrice;
  }

}
