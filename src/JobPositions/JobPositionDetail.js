import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const GET_POSITION_QUERY = gql`
    query JobPosition($id: String) {
        jobPosition(id: $id) {
            id,
            title,
            company,
            company_url,
            location,
            type,
            url,
            description,
            how_to_apply,
            company_logo
        }
    }
`;

const JobPositionDetail = (props) => {
    return (
        <Query query={GET_POSITION_QUERY} variables={{ id: props.match.params.id }}>
            {({ loading, error, data }) => {
                const detailsToShow = loading ? <p>Loading...</p> : error ? <p>Error :(</p> :
                    <div className='container'>
                        <div className='job-position job-details'>
                            <div className='job-position-header'>
                                <div className={data.jobPosition.company_logo ? 'company-logo' : 'company-logo no-logo'}>
                                    <img src={data.jobPosition.company_logo} alt={data.jobPosition.company} />
                                    <div>
                                        <h3>{data.jobPosition.title}</h3>
                                        <a href={data.jobPosition.company_url} target="_blank">{data.jobPosition.company}</a>
                                        <p>
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <span>Location:</span> {data.jobPosition.location || 'NA'}
                                        </p>
                                        <p><span>Type:</span> {data.jobPosition.type}</p>
                                    </div>
                                </div>
                                <Link to={`/`}><span className='view-details-btn'>Back</span></Link>
                            </div>
                            <p className='how-to-apply'><span>How To Apply:</span></p>
                            <p dangerouslySetInnerHTML={{ __html: data.jobPosition.how_to_apply }} />
                            <p className='how-to-apply'><span>Job Description:</span></p>
                            <p className='description' dangerouslySetInnerHTML={{ __html: data.jobPosition.description }} />
                        </div>
                    </div>
                return (
                    <div className='job-position-detail'>
                        <Header />
                        {detailsToShow}
                    </div>
                )
            }}
        </Query>
    );
}

export default JobPositionDetail;