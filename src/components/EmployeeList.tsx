import { Component } from 'react';
import { EmployeeDto } from '../model/EmployeeDTO';
import { IonList, IonItem, IonBadge, IonLabel } from '@ionic/react';
import React from 'react';

interface IEmployeeListComponentProps  {
    employeeList:EmployeeDto[];
}
export class EmployeeListComponent extends Component<IEmployeeListComponentProps> {

    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <IonList>
                {this.props.employeeList.map((item:EmployeeDto) => {
                  return(
                    <IonItem key={item.Id}>
                        <IonBadge slot="start" color={item.GenderColor}>{item.GenderBadge}</IonBadge>
                        <IonLabel>{item.Name}</IonLabel>
                        <IonLabel>{item.IpAddress}</IonLabel>
                        <IonLabel>{item.Gender}</IonLabel>
                        <IonLabel>{item.EmailId}</IonLabel>
                    </IonItem>
                  )
                })}
                </IonList>
        )
    }
}