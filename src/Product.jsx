import {Component} from 'react';
import {Description} from './Description';
import {Name} from './Name';
import {Price} from './Price';



export class Product extends Component {
  
    render() {
      return <div>
        <Name />{this.props.name}--
        <Price />{this.props.price}--
        <Description />{this.props.description}
      </div>;
    }
  }