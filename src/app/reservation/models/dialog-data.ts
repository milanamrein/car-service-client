import { MechanicDTO } from '../../shared/models/mechanic';

/**
 * The data that is sent to the dialog
 */
export class DialogData {
    time: number;
    date: string;
    mechanic: MechanicDTO;
}
