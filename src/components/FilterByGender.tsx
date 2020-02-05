import React, { Component } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

interface IFilterByGenderProps{
    placeholder:string;
    defaultValue:string;
    onGenderSelect:any;
}
export class FilterByGender extends Component<IFilterByGenderProps>{

    constructor(props:any){
        super(props);
        this.handleGenderSelect = this.handleGenderSelect.bind(this);
    }

    handleGenderSelect(value:string){
        this.props.onGenderSelect(value);
    }
    render(){
        return(
            <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonSelect placeholder={this.props.placeholder} onIonChange={(e:any)=>this.handleGenderSelect(e.target.value)}>
                    <IonSelectOption selected={this.props.defaultValue===''} value="">Select All</IonSelectOption>
                    <IonSelectOption selected={this.props.defaultValue==='Female'} value="Female">Female</IonSelectOption>
                    <IonSelectOption selected={this.props.defaultValue==='Male'} value="Male">Male</IonSelectOption>
                </IonSelect>
            </IonItem>
        )
    }
}