import { Component } from "react";

export class Price extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            price: `${props.text}$`,
            rate: 390
        };
    }

    changeCurrency = () => {
        const {price, rate} = this.state;
        if(price.endsWith("$")) {
            this.setState({
                price: parseFloat(price) * rate + "֏"
            })
        }
        else {
            this.setState({
                price: parseFloat(price) / rate + "$"
            })
        }
    };

    render() {
        return <div>
        <span>
            {this.state.price}
        </span>
        <button onClick={this.changeCurrency}>
            Change the currency
            </button>
        </div>;
    }
}