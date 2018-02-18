import { ReservationDTO } from './reservation';

/**
 * Mechanic Data Transfer Object interface
 */
export class MechanicDTO {
    id: string;
    username: string;
    fullName: string;
    mechanicReservations: ReservationDTO[];
}
