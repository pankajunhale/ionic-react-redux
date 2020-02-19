import { IonSearchbar, IonText, IonInput } from '@ionic/react';
import React,{Component} from 'react';

interface IEmployeeSearchBarComponentProps {
  placeHolderName:string;
  onTextChange:any;
  term:string
}
interface EmployeeSearchBarComponentState{
 
}
export class EmployeeSearchBarComponent extends Component<IEmployeeSearchBarComponentProps,EmployeeSearchBarComponentState>{
  
  constructor(props:any){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    //document.addEventListener("onChange", this.handleChange.bind(this));
  }
  handleChange(event:any){
    this.props.onTextChange(event.target.value);
  }
  
 
  render(){
    return(
    <div >
     {/* <IonSearchbar      
     onIonChange={this.handleChange.bind(this)}
     value={this.props.term}
     placeholder={this.props.placeHolderName}>
     </IonSearchbar> */}
     <input type='text' 
     placeholder="Search By Name..."
     className="form-control mt-2" 
     onChange={this.handleChange.bind(this)}></input>
     </div>
    )
  }  
}
