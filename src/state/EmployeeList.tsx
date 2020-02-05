import { EmployeeDto } from "../model/EmployeeDTO";
import { EmployeeEmailDomainDTO } from "../model/EmployeeEmailDomainDTO";

export interface EmployeeSearchState {
    EmployeeList: Array<EmployeeDto>;
    EmployeePagination:EmployeePaginationDto;
    EmployeeSearchTermFilter:EmployeeSearchTermDTO;
    EmployeeDomainFilter:Array<EmployeeEmailDomainDTO>;
    GenderFilter:Array<EmployeeGenderDTO>;
    Gender:string;
}

export class EmployeeFilter{
    EmployeeSearchTermFilter:EmployeeSearchTermDTO = new EmployeeSearchTermDTO();
    EmployeeDomainFilter:Array<EmployeeEmailDomainDTO> = new Array<EmployeeEmailDomainDTO>();
    GenderFilter:Array<EmployeeGenderDTO> = new Array<EmployeeGenderDTO>();
    constructor(){

    }
}

export class EmployeePaginationDto{
    PageSize:number = 0;
    TotalRecords:number = 0;
    PageIndex:number = 0; 
    IsDisableNext:boolean = false;
    IsDisablePrevious:boolean = false;
    TotalPages:number = 0;
    UserPage:number = 0;
    constructor(){

    }   
}

export class EmployeeGenderDTO {
    Name:string = '';
    Value:string = '';
    IsChecked:boolean = false;
    constructor(name:string,value:string){
        this.Name = name;
        this.Value = value;
    }
}

export class EmployeeSearchTermDTO {
    Placeholder:string = '';
    Value:string = '';
    constructor(){
       
    }
}