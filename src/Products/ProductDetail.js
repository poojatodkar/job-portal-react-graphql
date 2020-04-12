import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import moment from 'moment';

const GET_PRODUCT_QUERY = gql`
    query Product($id: String) {
        product(id: $id) {
            id,
            name,
            image,
            description,
            createdAt,
            votes
        }
    }
`;

const ProductDetail = (props) => {
    return (
        <Query query={GET_PRODUCT_QUERY} variables={{ id: props.match.params.id }}>
            {({ loading, error, data }) => {
                const detailsToShow = loading ? <p>Loading...</p> : error ? <p>Error :(</p> :
                    <div className='container'>
                        <div className='products product-details'>
                            <div className='products-header'>
                                <div className={data.product.image ? 'image' : 'image no-logo'}>
                                    <img src={data.product.image} alt={data.product.name} />
                                    <div>
                                        <h3>{data.product.name}</h3>
                                        <p className='description' dangerouslySetInnerHTML={{ __html: data.product.description }} />
                                        <p className="details">Votes: <span>{data.product.votes}</span></p>
                                        <p className="details">Created At: <span>{moment(data.product.createdAt).format('LL')}</span></p>
                                    </div>
                                </div>
                                <Link to={`/`}><span className='view-details-btn'>Back</span></Link>
                            </div>
                        </div>
                    </div>
                return (
                    <div className='product-detail'>
                        <Header />
                        {detailsToShow}
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;