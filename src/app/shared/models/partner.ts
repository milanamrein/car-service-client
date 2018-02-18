import { ReservationDTO } from './reservation';

/**
 * Partner Data Transfer Object interface
 */
export class PartnerDTO {
    Id: string;
    Username: string;
    FullName: string;
    Address: string;
    partnerReservations: ReservationDTO[];
}
