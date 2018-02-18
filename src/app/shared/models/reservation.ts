import { PartnerDTO } from './partner';
import { ReservationTypeDTO } from './reservation-type';
import { MechanicDTO } from './mechanic';
import { WorksheetDTO } from './worksheet';

/**
 * Data Transfer Object interface for reservations
 */
export class ReservationDTO {
    id: number;
    time: Date;
    mechanic: MechanicDTO;
    partner: PartnerDTO;
    worksheet: WorksheetDTO;
    type: ReservationTypeDTO;
    comment: string;
}
