export class EmployeeEmailDomainDTO{
    Name:string = '';
    IsChecked:boolean = false;
    constructor(name:string,isChecked:boolean){
        this.Name = name;
        this.IsChecked = isChecked;
    }
}