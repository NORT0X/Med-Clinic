export class User {
    _id: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    firstname: string;
    lastname: string;
    branch: string;
    address: string;
    licenseID: number;
    specialization: string;
    userType: string;
    picturePath: string;
    verified: boolean;
    isEditEnabled: boolean = false;
}