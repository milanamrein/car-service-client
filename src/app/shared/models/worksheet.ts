import { MaterialDTO } from './material';
import { ReservationDTO } from './reservation';
import { MechanicDTO } from './mechanic';
import { PartnerDTO } from './partner';

export class WorksheetDTO {
    id: number;
    partner: PartnerDTO;
    mechanic: MechanicDTO;
    reservation: ReservationDTO;
    materials: MaterialDTO[];
}
