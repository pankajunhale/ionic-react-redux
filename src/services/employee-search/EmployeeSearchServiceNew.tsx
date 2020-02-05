import { BehaviorSubject, combineLatest } from 'rxjs'
import { EmployeeDto } from '../../model/EmployeeDTO';
import { switchMap, map, flatMap, skip, take, toArray, tap  } from 'rxjs/operators';
import {  of, from } from 'rxjs';
import { EmployeeInfo } from '../../mock-data/EmployeeMockData';
import * as _ from  'underscore'
import { EmployeeEmailDomainDTO } from '../../model/EmployeeEmailDomainDTO';
//import { EmployeeFilterInfo } from '../dto/EmployeeFilterInfoDto';


export class EmployeeServiceNew {

  private PAGE_LIMIT: number = 10;
  constructor() {
  }

  searchEmployee$ = new BehaviorSubject('');
  pageOffset$ = new BehaviorSubject(0);
  pageLimit$ = new BehaviorSubject(this.PAGE_LIMIT);
  searchByGender$ = new BehaviorSubject('');
  employeeListDto: Array<EmployeeDto> = new Array<EmployeeDto>();
  totalResult$= new BehaviorSubject(0);
  gender$ = new BehaviorSubject("");
  domain$ = new BehaviorSubject(this.getAllDomain());
  //totalPages$;
  totalPages$ = combineLatest(this.totalResult$,this.pageLimit$).pipe(
    map(([total,limit])=> Math.ceil(total/limit))
  );
  
  
  combinedSearchParameters = combineLatest(this.searchEmployee$, this.pageOffset$,this.gender$,this.domain$);

  employeeResult$ = this.combinedSearchParameters.pipe(
    switchMap(([term,pageOffset,gender,domainList]) => {
      return this.getAllEmployee(term, pageOffset,gender,domainList) //this._http.get("/assets/mock-data/employee-list.json");
    }),
    tap((res:any)=>{
      //side effect operator
      //debugger;
      this.totalResult$.next(this.findTotalRecords(this.searchEmployee$.getValue(),this.gender$.getValue(),this.domain$.getValue()));
    }),
    map((response: any) => {
      this.employeeListDto.length = 0;
      response.forEach((element:any) => {
        this.employeeListDto.push(this.setEmployeeDataToDto(element));
      });
      return this.employeeListDto;
    })    
  );

//   employeeFilterInfo$ = combineLatest(this.gender$,this.searchEmployee$,this.domain$).pipe(
//     map(([gender,searchTerm,domainList])=>{
//       const obj = new EmployeeFilterInfo(searchTerm,gender,domainList);
//       console.log(obj);      
//       return obj;
//     })
//   )

  private setEmployeeDataToDto(element: any) {
    return new EmployeeDto(element);    
  }
  
  private manageFilter(item: any, term:string,gender:string,domainList:Array<EmployeeEmailDomainDTO>) {
    //console.log(term,gender);
    return this.manageFilterOption(gender,term,domainList,item);    
  }
  private findTotalRecords(term:string,gender:string,domainList:Array<EmployeeEmailDomainDTO>){
    const data = EmployeeInfo.filter((item:any)=>{  
      return this.manageFilterOption(gender,term,domainList,item);
    });    
    return data.length;
  }

  private getAllEmployee(term:string, pageOffset:number,gender:string,domainList:Array<EmployeeEmailDomainDTO>) {
    const skipRecords = (pageOffset * this.PAGE_LIMIT);
    let result: any = of(EmployeeInfo);    
    let source = result.pipe(
      flatMap((response: any) => from(response.filter((item:any) => {
        return this.manageFilter(item,term,gender,domainList);
      }
      ))),
      skip(skipRecords),
      take(this.PAGE_LIMIT),
      toArray()
      // returns Observable<items> from array of items
      // flatMap merges back the observables into one
    );
    //debugger;
    //console.log(source);
    return source;
  }

  private getAllDomain(){
    const list:Array<EmployeeEmailDomainDTO> = new Array<EmployeeEmailDomainDTO>();
    const emailList = _.pluck(EmployeeInfo,'email');      
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

  private manageFilterOption(gender:string,term:string,domainList:Array<EmployeeEmailDomainDTO>,item:any){
    //console.log(gender);
    
    const name = (item.first_name + " " + item.last_name).toLowerCase(); 
    const domainName:string = item.email.split('.')[1];
    const isDomainChecked = this.isDomainSelected(domainList,domainName);
    if(this.isAnyDomainOptionSelected(domainList)){
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

  private isDomainSelected(domainList:Array<EmployeeEmailDomainDTO>,domainName:string){
    const result = domainList.filter(element => {
      return (element.Name.toLowerCase() === domainName.toLowerCase() && element.IsChecked)      
    });
    return (result.length > 0);    
  }
  private isAnyDomainOptionSelected(domainList:Array<EmployeeEmailDomainDTO>){
    const result = domainList.filter(element => {
      return (element.IsChecked)      
    });
    return (result.length > 0);    
  }

  public setPageOffset(currentPageIndex: number) {
    const currentPage = this.pageOffset$.getValue();
    this.pageOffset$.next(currentPage + currentPageIndex);
  }

  public setSearch(data:string){
    this.pageOffset$.next(0);
    this.searchEmployee$.next(data);
  }

  public setGender(data:string){
    this.pageOffset$.next(0);
    this.gender$.next(data);
  }

  public setDomain(data:any){    
    this.searchEmployee$.next("");
    this.pageOffset$.next(0);
    const result = this.domain$.getValue();
    result.forEach((element:EmployeeEmailDomainDTO) => {
        if(element.Name === data.item.Name){
            element.IsChecked = data.value;
        }
    });
    this.domain$.next(result);
  }

  public setResetSearch(){
    this.searchEmployee$.next("");
    this.pageOffset$.next(0);
    this.gender$.next("");
    const domainList = this.domain$.getValue();
    domainList.forEach((element:EmployeeEmailDomainDTO) => {
      element.IsChecked = false;
    });
    this.domain$.next(domainList);
  }

  public setInitialSearch(){
      this.setResetSearch();
  }

  public filterByName(term:string){
    //debugger;
    this.searchEmployee$.next(term);
    return this.employeeResult$;
  }
  public findAllEmployee(requestInfo:any){
    //debugger;
    this.searchEmployee$.next(requestInfo);
    return this.employeeResult$;
  }

  public filterEmployeeByDomain(data:any){
    this.setDomain(data);
    return this.employeeResult$;
  }

  public filterEmployeeByGender(data:string){
    this.setGender(data);
    return this.employeeResult$;
  }

}
