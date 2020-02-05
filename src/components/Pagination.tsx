import React, { Component } from 'react';
import { IonItem, IonButton, IonLabel } from '@ionic/react';

interface IPaginationComponentProps {
    userPage: number;
    totalPages: number;
    totalResult: number;
    isDisablePrevious: boolean;
    isDisableNext: boolean;
    onPrevious: any;
    onNext: any;
}
export class PaginationComponent extends Component<IPaginationComponentProps>{

    constructor(props: any) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    handlePrevious(value: number) {
        this.props.onPrevious(value);
    }

    handleNext(value: number) {
        this.props.onNext(value);
    }

    render() {
        if (this.props.totalResult > 0) {
            return (
                <IonItem>
                    <IonButton onClick={(e: any) => this.handlePrevious(-1)} disabled={this.props.isDisablePrevious} color="tertiary">Previous</IonButton>
                    <IonLabel slot="end"> <strong> Page: {this.props.userPage} of {this.props.totalPages} </strong></IonLabel>
                    <IonLabel slot="end"><strong>Total Records: {this.props.totalResult}</strong></IonLabel>
                    <IonButton onClick={(e: any) => this.handleNext(1)} disabled={this.props.isDisableNext} slot="end" color="tertiary">Next</IonButton>
                </IonItem>
            )
        }
        else {
            return null; // it is mandatory
        }
    }
}