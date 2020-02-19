import { Component } from 'react';
import { EmployeeDto } from '../model/EmployeeDTO';
import { IonList, IonItem, IonBadge, IonLabel } from '@ionic/react';
import React from 'react';
import { useHistory, Link, NavLink } from "react-router-dom";
import history from '../history';


interface IEmployeeListComponentProps {
    employeeList: EmployeeDto[];
}
export const EmployeeListComponentNew: React.FC<IEmployeeListComponentProps> = (props:IEmployeeListComponentProps) => {

        //const history = useHistory();
        function handleViewClick(id:number) {
           // debugger;
            history.push("/view/"+id);
            //history.push("/edit/"+id);
        }
        function handleEditClick(id:number) {
            history.push("/edit/"+id);
         }
    return (
        <IonList>
        {props.employeeList.map((item:EmployeeDto) => {
        return(
            <IonItem key={item.Id}>
                <IonBadge slot="start" color={item.GenderColor}>{item.GenderBadge}</IonBadge>
                <IonLabel><a  onClick={(e)=>handleViewClick(item.Id)}  >{item.Name}</a></IonLabel>
                <IonLabel>{item.Gender}</IonLabel>
                <IonLabel>{item.EmailId}</IonLabel>
                <button onClick={(e)=>handleEditClick(item.Id)} className="btn-link">Edit-L</button>
            </IonItem>
        )
        })}
        </IonList>
    )
}

export class EmployeeListComponent extends Component<IEmployeeListComponentProps> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <IonList>
                {this.props.employeeList.map((item: EmployeeDto) => {
                    return (
                        <IonItem key={item.Id}>
                            <IonBadge slot="start" color={item.GenderColor}>{item.GenderBadge}</IonBadge>
                            <IonLabel>
                                {item.Name}</IonLabel>
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
