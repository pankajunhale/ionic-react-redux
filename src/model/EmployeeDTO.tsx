export class EmployeeDto{
    Id:number = 0;
    FirstName:string = '';
    LastName:string = '';
    EmailId:string = '';
    IpAddress:string = '';
    Name:string = '';
    UpdtatedBy:string = '';
    Gender:string = '';
    GenderBadge:string = '';
    GenderColor:string = '';    
    UpdtatedAt:string = '';
    
    constructor(element:any){
        if(element !== null){
            this.Id = element.id;
            this.LastName = element.last_name;
            this.FirstName = element.first_name;
            this.Name = `${this.FirstName + " " + this.LastName}`;
            this.EmailId = element.email;
            this.Gender = element.gender;
            this.GenderBadge = this.Gender.toLowerCase() === 'female' ? 'F' : 'M';
            this.GenderColor = this.GenderBadge.toUpperCase() === 'F' ? 'danger' : 'primary'
            this.IpAddress = element.ip_address;
            this.UpdtatedAt = new Date().toDateString();
        }
    }
}