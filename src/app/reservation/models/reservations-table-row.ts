import { ReservationsTableCell } from './reservations-table-cell';
import { MechanicDTO } from '../../shared/models/mechanic';

/**
 * Represents one row in the Reservations table
 */
export class ReservationsTableRow {
    mechanic: MechanicDTO;
    cells: ReservationsTableCell[];
}
