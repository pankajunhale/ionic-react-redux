import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonBadge, IonLabel, IonButton } from '@ionic/react';
import { americanFootball, basketball, beer, bluetooth, boat, build, flask, football, paperPlane, wifi } from 'ionicons/icons';
import React , {Component} from 'react';
import { ApplicationState } from '../stores';
import {connect} from 'react-redux';
import { EmployeeDto } from '../model/EmployeeDTO';
import { EmployeeSearchBarComponent } from '../components/EmployeeSearchBar';
import { EmployeeDomainComponent } from '../components/EmployeeDomain';
import { PaginationComponent } from '../components/Pagination';
import { EmployeeListComponent, EmployeeListComponentNew } from '../components/EmployeeList';
import { NoRecordFoundComponent } from '../widget/NoRecordFound';
import { EmployeePaginationDto,EmployeeSearchTermDTO } from '../state/EmployeeList';
import { EmployeeEmailDomainDTO } from '../model/EmployeeEmailDomainDTO';
import { FilterByGender } from '../components/FilterByGender';


interface IListPageProps {
  employeeList:EmployeeDto[];
  myPagination:EmployeePaginationDto;
  domainList:EmployeeEmailDomainDTO[];
  searchByTerm: EmployeeSearchTermDTO;
  dispatch:any;
  onNext:any;
  onPrevious:any;
  onDomainSelect:any;
  filterByName:any;
  filterByDomain:any;
  filterByGender:any;
  loadAllEmployee:any;
  //onSearchTermChange:any;
  loadAllDomainFilter:any;
  gender:string;
  //history:any;
}
interface IListPageState {
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IListPageProps & IListPageState;


class ListPage extends Component<AllProps>{
  constructor(props:any){
    super(props);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onDomainSelect = this.onDomainSelect.bind(this);
    this.onGenderSelect = this.onGenderSelect.bind(this);

    this.props.loadAllEmployee("");
    this.props.loadAllDomainFilter();
    console.log(props);
  }

  componentDidMount(){
   
  }
  
  componentWillReceiveProps() {
  }
  //all callbacks
  public onSearchTermChange = (value:string) =>{
   
    this.props.loadAllEmployee(value);
  }
  public onDomainSelect = (data:any) =>{
   // this.props.history.push("/view/307")    

    this.props.filterByDomain(data);
  }
  public onGenderSelect = (data:string) =>{
    this.props.filterByGender(data);
  }
  //
  render(){
    return (   
      <div>
        
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reactive Programming Using RxJs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonRow>
                <IonCol>
                    <EmployeeSearchBarComponent 
                    term={this.props.searchByTerm.Value} 
                    onTextChange={this.onSearchTermChange} 
                    placeHolderName={this.props.searchByTerm.Placeholder}></EmployeeSearchBarComponent>
                </IonCol>                   
            </IonRow>
            <IonRow>
              <IonCol size="3">
                  <FilterByGender 
                    defaultValue={this.props.gender} 
                    placeholder="Select one" 
                    onGenderSelect={this.onGenderSelect}>
                  </FilterByGender>
                  {/* <EmployeeFilter employeeFilterInfo={filterInfo} onReset={onFilterReset}></EmployeeFilter> */}
                  <EmployeeDomainComponent
                    onDomainSelect={this.onDomainSelect} 
                    domainList={this.props.domainList}>                      
                  </EmployeeDomainComponent>
              </IonCol>
              <IonCol size="9">                  
                   <PaginationComponent
                    isDisableNext={this.props.myPagination.IsDisableNext}
                    isDisablePrevious={this.props.myPagination.IsDisablePrevious}
                    totalPages={this.props.myPagination.TotalPages}
                    userPage={this.props.myPagination.UserPage}
                    totalResult={this.props.myPagination.TotalRecords}
                    onNext={this.props.onNext}
                    onPrevious={this.props.onPrevious}
                  ></PaginationComponent>  
                  <NoRecordFoundComponent isDisplay={(this.props.myPagination.TotalRecords != 0)} ></NoRecordFoundComponent>        
                  <EmployeeListComponentNew employeeList={this.props.employeeList}></EmployeeListComponentNew>
                  {/* <EmployeeListComponent employeeList={this.props.employeeList}></EmployeeListComponent> */}
                  <PaginationComponent
                    isDisableNext={this.props.myPagination.IsDisableNext}
                    isDisablePrevious={this.props.myPagination.IsDisablePrevious}
                    totalPages={this.props.myPagination.TotalPages}
                    userPage={this.props.myPagination.UserPage}
                    totalResult={this.props.myPagination.TotalRecords}
                    onNext={this.props.onNext}
                    onPrevious={this.props.onPrevious}
                  ></PaginationComponent>  
              </IonCol>
            </IonRow>   
        </IonContent>
      </IonPage>   
      </div>
    );
  }
}

const mapStateToProps = (state:ApplicationState) => ({
  employeeList: state.employeeListState.EmployeeList,
  myPagination: state.employeeListState.EmployeePagination,
  domainList: (state.employeeListState.EmployeeDomainFilter) ? state.employeeListState.EmployeeDomainFilter : [],
  searchByTerm: state.employeeListState.EmployeeSearchTermFilter,
  genderList: state.employeeListState.GenderFilter,
  gender:state.employeeListState.Gender
});

const mapDispatchToProps = (dispatch:any)=>({
    loadAllEmployee:(term:string) => dispatch({type:'LOAD_ALL_EMPLOYEE',data:term}),
    filterByName: (term:string) => dispatch({type:'FILTER_EMPLOYEE_BY_NAME',data:term}),
    loadAllDomainFilter: () => dispatch({type:'LOAD_ALL_DOMAIN_FILTER'}),
    filterByDomain: (selectedData:boolean) => dispatch({type:'FILTER_EMPLOYEE_BY_DOMAIN',data:selectedData}),
    filterByGender: (gender:string) => dispatch({type:'FILTER_EMPLOYEE_BY_GENDER',data:gender}),
});
export default connect(mapStateToProps,mapDispatchToProps)(ListPage);