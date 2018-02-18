import { ReservationsTable } from '../../models/reservations-table';
import { MechanicService } from '../../../shared/services/mechanic.service';
import { AppError } from '../../../common/errors/app-error';
import { MechanicDTO } from '../../../shared/models/mechanic';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //#region Fields

  // the Reservations table schema
  table: ReservationsTable;

  // list of mechanics with all reservations
  mechanics: MechanicDTO[];  

  // current date
  currentDate: string;

  // indicates whether the page is loading or not
  isLoading: boolean;

  //#endregion

  //#region Default constructor

  constructor(private mechanicService: MechanicService) {        
    this.currentDate = new Date(Date.now()).toLocaleDateString();
    this.getAllMechanics();
  }

  //#endregion  

  //#region Methods

  /**
   * Gets all the mechanics and their reservations
   */
  getAllMechanics() {
    this.isLoading = true;

    this.mechanicService.getAll()
      .subscribe(
        (mechanics: MechanicDTO[]) => {
          this.mechanics = mechanics;
          this.table = new ReservationsTable(this.mechanics, this.currentDate);
          this.isLoading = false;
        },
        (error: AppError) =>  { throw error; });
  }

  /**
   * The form method which gets all the mechanic reservations
   * of a specific date
   * @param date - the date
   */
  getReservationsOn(date: string) {
    this.currentDate = date;
    this.table = new ReservationsTable(this.mechanics, this.currentDate);
  }

  /**
   * Updates mechanics when it is necessary
   * @param areMechanicsUpdated - indicates whether the mechanics 
   * were updated or not
   */
  refreshMechanics(areMechanicsUpdated: boolean) {
    if (areMechanicsUpdated)
      this.getAllMechanics();
  }   

  //#endregion

}
