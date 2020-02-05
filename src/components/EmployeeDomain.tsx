import { Component } from 'react';
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react';
import React from 'react';
import { EmployeeEmailDomainDTO } from '../model/EmployeeEmailDomainDTO';

interface EmployeeDomainComponentProps {
    domainList: EmployeeEmailDomainDTO[];
    onDomainSelect:any;
}
export class EmployeeDomainComponent extends Component<EmployeeDomainComponentProps> {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const myStyle = {
            backgroundColor: '#ccc',
            padding: '4px'
        }
        return (
            <div style={myStyle}>
                {
                    this.props.domainList.map((item: EmployeeEmailDomainDTO, index: number) => {
                        return (
                            <IonItem key={index}>
                                <IonLabel>{item.Name.toUpperCase()}</IonLabel>
                                <IonCheckbox
                                    color="dark"
                                    checked={item.IsChecked}
                                    slot="end" onClick={e => this.handleChange(e, item)}>
                                </IonCheckbox>
                            </IonItem>
                        )
                    })
                }
            </div>

        )
    }
    handleChange(e: any, selectedItem: EmployeeEmailDomainDTO): void {
        this.props.onDomainSelect({value:e.target.checked,item:selectedItem});
    }
}