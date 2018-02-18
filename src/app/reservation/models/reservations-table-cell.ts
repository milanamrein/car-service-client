import { ReservationDTO } from '../../shared/models/reservation';

/**
 * Represents one cell in the Reservations table
 */
export class ReservationsTableCell {
    time: number;
    reservation: ReservationDTO;
}
