import { Component } from "react";
import React from "react";

interface INoRecordFoundComponent{
    isDisplay:boolean
}
export class NoRecordFoundComponent extends Component<INoRecordFoundComponent> {
    constructor(props:any) {
        super(props);
    }

    render(){
        if(this.props.isDisplay){
        const myStyle = {
            height:'150px',
            marginTop:'75px',
            backgroundColor:'#f4f4f4'
        }
        return(
            <div style={myStyle}> 
                <strong>No records found...</strong>
            </div> 
        )}
        else{
            return null;
        }
    }
}