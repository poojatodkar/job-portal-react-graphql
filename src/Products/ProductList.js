import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import './Products.css';

const GET_PRODUCT_LIST_QUERY = gql`
query Products($createdAt: String) {
    products(createdAt: $createdAt) {
        id,
        name,
        image,
        description,
        createdAt,
        votes
    }
}
`;

class Products extends Component {
    constructor(props) {
        super(props);

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        console.log(today);
        this.state = {
            variables: {
                createdAt: today
            }
        };
    }

    onDateChange = (date, dateString) => {
        this.setState({
            variables: {
                ...this.state.variables,
                createdAt: dateString
            }
        });
    }

    render() {
        return (
            <Query
                query={GET_PRODUCT_LIST_QUERY}
                variables={this.state.variables}
            >
                {({ loading, error, data }) => {
                    console.log(data)
                    const detailsToShow = loading ? <p>Loading...</p> : error ? <p>Error :(</p> : data.products.length === 0 ? <p className='no-results-found'>No results found!!</p> : data.products.map(({ id, name, votes, image, description, createdAt }) => (
                        <Link to={`/job/${id}`} className="product-list" key={id}>
                            <div>
                                <div className='products' key={id}>
                                    <div className='products-header'>
                                        <div className={image ? 'image' : 'image no-logo'}>
                                            <img src={image} alt={name} />
                                            <div>
                                                <h3>{name}</h3>
                                                <p className='description' dangerouslySetInnerHTML={{ __html: description }} />
                                                <p className="details">Votes: <span>{votes}</span></p>
                                                <p className="details">Created At: <span>{moment(createdAt).format('LL')}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ));
                    return (
                        <div>
                            <Header />
                            <div className='container'>
                                <div className='filters'>
                                    <div className='date'>
                                        <label>Select Date</label>
                                        <DatePicker onChange={this.onDateChange} defaultValue={moment(this.state.createdAt)} />
                                    </div>
                                </div>
                                {detailsToShow}
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default Products;