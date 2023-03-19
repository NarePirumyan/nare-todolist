import { Component } from 'react';
import { Description } from './Description';
import { Name } from './Name';
import { Price } from './Price';



export class Product extends Component {


    render() {
        const { name, price, description } = this.props;

        return <div>
            <Name text={name} />
            <Price text={price} />
            <Description text={description} />
            <hr />
        </div>;
    }
}