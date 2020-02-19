import React , {Component} from 'react';
import { ApplicationState } from '../stores';
import {connect} from 'react-redux';
import { EmployeeViewState } from '../state/EmployeeViewState';
import { EmployeeDto } from '../model/EmployeeDTO';
import { IonItem, IonLabel, IonRow, IonList, IonBadge, IonCol, IonButton } from '@ionic/react';
import history from '../history'

interface IViewEmployeeProps{
    employeeInfo:EmployeeDto;
    loadEmployeeDetails:any;
    location:any;
    match:any;
}
interface IViewEmployeeState{

}
type AllProps = IViewEmployeeProps & IViewEmployeeState;


class ViewEmployee extends Component<AllProps>{
    constructor(props:any){
        super(props);
        this.init();
    }

    componentDidMount(){

    }

    private init(){
        this.bindEmployee();
    }

    private bindEmployee(){
        const queryParams = this.props.match.params
        this.props.loadEmployeeDetails(parseInt(queryParams['id']));
    }

    render(){
        return (
            <IonList>
            <IonRow>
                <IonCol>
                <IonLabel><h1>Employee Details - </h1> </IonLabel>
                </IonCol>
                <IonCol>
                <IonLabel>{this.props.employeeInfo.Name}</IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
        <IonButton onClick={(e)=>history.goBack()}>Back</IonButton>
                </IonCol>
            </IonRow>
            <IonItem>
                    <IonLabel>Id:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.Id}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Name:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.Name}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>First Name:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.FirstName}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Last Name:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.LastName}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Gender:</IonLabel>
                    <IonBadge color={this.props.employeeInfo.GenderColor}>{this.props.employeeInfo.GenderBadge}</IonBadge>
                    <IonLabel><strong>{this.props.employeeInfo.Gender}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Ip Address:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.IpAddress}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Email:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.EmailId}</strong></IonLabel>
            </IonItem>
            <IonItem>
                    <IonLabel>Updtated At:</IonLabel>
                    <IonLabel><strong>{this.props.employeeInfo.UpdtatedAt}</strong></IonLabel>
            </IonItem>
            </IonList>
        )
    }
}

const mapStateToProps = (state:ApplicationState) => ({
    employeeInfo: state.viewEmployeeState.EmployeeDetails
});

const mapDispatchToProps = (dispatch:any) => ({
    loadEmployeeDetails:(id:number) => dispatch({type:'VIEW_EMPLOYEE_DETAILS',data:id}),
});

export default connect(mapStateToProps,mapDispatchToProps)(ViewEmployee);
