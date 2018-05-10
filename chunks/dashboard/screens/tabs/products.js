import React, { PureComponent } from 'react';

export default class ProductsScreen extends PureComponent {
  constructor() {
    super()
    this.state = {...this.state}
    //   loading: true,
    // }
  }

  render() {
    // if (this.state.loading) return (<div><br/><br/>Loading</div>)

    return (
      <div>Your products</div>

    )
  }
}
