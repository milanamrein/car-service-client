import { ReservationsTableCell } from './reservations-table-cell';
import { MechanicDTO } from '../../shared/models/mechanic';
import { ReservationsTableRow } from './reservations-table-row';

/**
 * Reservations table class
 */
export class ReservationsTable {
    rows: ReservationsTableRow[];
    times: number[];

    constructor(
        mechanics: MechanicDTO[],
        date: string) {
        
        this.times = [9, 10, 11, 12, 13, 14, 15, 16];
        this.rows = new Array<ReservationsTableRow>();
        mechanics.forEach(mechanic => {
            
            // a row in the table
            let row = new ReservationsTableRow();
            row.cells = new Array<ReservationsTableCell>();
            row.mechanic = mechanic;
    
            this.times.forEach(time => {
                // indicates whether a reservation was found
                // for a specific hour
                let isReservationFoundForTime = false;

                // if the mechanic has any reservations
                if (mechanic.mechanicReservations.length > 0) {
                    mechanic.mechanicReservations.forEach(reservation => {
                        // getting the date of the reservation
                        let reservationDate = new Date(reservation.time);
            
                        // if the reservation's date is the same as the current date
                        if (reservationDate.toLocaleDateString().localeCompare(date) === 0) {
                            // then get the reservation's hour
                            let hour = reservationDate.getHours();
                            // and check if it is the same as
                            // the current time in the iteration
                            if (hour === time) {
                                // create a table cell, and add it to the row
                                let cell = new ReservationsTableCell();
                                cell.time = hour;
                                cell.reservation = reservation;
                                row.cells.push(cell);
                                isReservationFoundForTime = true;
                            }
                        }
                    });
                }
        
                // if there wasn't any reservation for the current time
                if (!isReservationFoundForTime) {
                    // create blank cell
                    let cell = new ReservationsTableCell();
                    cell.time = time;
                    row.cells.push(cell);
                }
            });
    
            // add row to the table
            this.rows.push(row);            
        });        

    }

}
