export class Appointment {
    _id: string;
    type: string;       // ObjectId
    doctor: string;     // ObjectId
    patient: string;    // ObjectId
    date: Date;
    duration: number;
    valid: boolean;
    isEditEnabled: boolean = false;
    cancelDescription: string;
}