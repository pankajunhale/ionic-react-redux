import * as _ from  'underscore';
import { EmployeeEmailDomainDTO } from "../../model/EmployeeEmailDomainDTO";
import { EmployeeDto } from '../../model/EmployeeDTO';
import { EmployeeGenderDTO } from '../../state/EmployeeList';

export const getAllDomain = (employeeList:Array<EmployeeDto>) =>{
    const list:Array<EmployeeEmailDomainDTO> = new Array<EmployeeEmailDomainDTO>();
    const emailList = _.pluck(employeeList,'EmailId');      
    const strList:Array<string> = new Array<string>();
    emailList.forEach((element:any) => {
      const splitResult = element.split('.');
      if(splitResult.length > 0){        
        strList.push(splitResult[1]);                  
      }
    });
    const uniqueResult = Array.from(new Set(strList)); 
    _.map(uniqueResult,(item:any,index:number)=>{
      list.push(new EmployeeEmailDomainDTO(item,false));      
    });      
    return list;
}

export const getAllGender = () =>{
    const list:Array<EmployeeGenderDTO> = new Array<EmployeeGenderDTO>();
    list.push(new EmployeeGenderDTO('Male','M'));
    list.push(new EmployeeGenderDTO('Female','F'));
    return list;
}

export const filerEmployeeByName = (payloadRequest:any) =>{

}


const manageFilterOption = (gender:string,term:string,domainList:Array<EmployeeEmailDomainDTO>,item:any) =>{
  //console.log(gender);
  
  const name = (item.first_name + " " + item.last_name).toLowerCase(); 
  const domainName:string = item.email.split('.')[1];
  const isDomainChecked = isDomainSelected(domainList,domainName);
  //debugger;
  if(isAnyDomainOptionSelected(domainList)){
    if(gender === ''){
      return (isDomainChecked && name.includes(term.toLowerCase()));
    }
    else{
      return ((item.gender === gender && isDomainChecked && name.includes(term.toLowerCase())));
    }
  }
  //console.log(isDomainChecked);
  if(gender===''){
    return (name.includes(term.toLowerCase()));
  }
  else{
      return ((item.gender === gender && name.includes(term.toLowerCase())));
  } 
 
  //debugger;
  //return ((item.gender === gender && name.includes(term.toLowerCase())));
}

const isDomainSelected = (domainList:Array<EmployeeEmailDomainDTO>,domainName:string) =>{
  const result = domainList.filter(element => {
    return (element.Name.toLowerCase() === domainName.toLowerCase() && element.IsChecked)      
  });
  return (result.length > 0);    
}

const isAnyDomainOptionSelected = (domainList:Array<EmployeeEmailDomainDTO>) =>{
  const result = domainList.filter(element => {
    return (element.IsChecked)      
  });
  return (result.length > 0);    
}