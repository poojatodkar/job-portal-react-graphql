import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import './JobPosition.css';

const GET_POSITION_LIST_QUERY = gql`
query JobPositions($type: String, $location: String) {
    jobPositions(type: $type, location: $location) {
        id,
        title,
        company,
        company_url,
        company_logo,
        location,
        type,
        url,
        description
    }
}
`;

class JobPositions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variables: {}
        };
    }

    onTypeChange = e => {
        this.setState({
            variables: {
                ...this.state.variables,
                type: e.target.value
            }
        });
    }

    onLocationChange = e => {
        this.setState({
            variables: {
                ...this.state.variables,
                location: e.target.value
            }
        });
    }

    render() {
        return (
            <Query
                query={GET_POSITION_LIST_QUERY}
                variables={this.state.variables}
            >
                {({ loading, error, data }) => {
                    const detailsToShow = loading ? <p>Loading...</p> : error ? <p>Error :(</p> : data.jobPositions.length === 0 ? <p className='no-results-found'>No results found!!</p> : data.jobPositions.map(({ id, title, company, company_url, company_logo, type, location, url, description }) => (
                        <div key={id}>
                            <div className='job-position' key={id}>
                                <div className='job-position-header'>
                                    <div className={company_logo ? 'company-logo' : 'company-logo no-logo'}>
                                        <img src={company_logo} alt={company} />
                                        <div>
                                            <h3>{title}</h3>
                                            <a href={company_url} target="_blank">{company}</a>
                                            <p>
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <span>Location:</span> {location || 'NA'}
                                            </p>
                                            <p><span>Type:</span> {type}</p>
                                        </div>
                                    </div>
                                    <Link to={`/job/${id}`}><span className='view-details-btn'>View Details</span></Link>
                                </div>
                                <p className='description' dangerouslySetInnerHTML={{ __html: description }} />
                                <p><a href={url} className='apply-now-btn' target="_blank">Apply Now</a></p>
                            </div>
                        </div>
                    ));
                    return (
                        <div>
                            <Header />
                            <div className='container'>
                                <div className='filters'>
                                    <div className='type'>
                                        <label>Select Type</label>
                                        <select onChange={this.onTypeChange} defaultValue="default">
                                            <option value="default" disabled hidden>Choose here</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                        </select>
                                    </div>
                                    <div className='location'>
                                        <label>Select Location</label>
                                        <select onChange={this.onLocationChange} defaultValue="default">
                                            <option value="default" disabled hidden>Choose here</option>
                                            <option value="Berlin">Berlin</option>
                                            <option value="Portland, OR">Portland, OR</option>
                                            <option value="Washington, DC">Washington, DC</option>
                                            <option value="Eschborn">Eschborn</option>
                                            <option value="Chemnitz">Chemnitz</option>
                                            <option value="Zaltbommel">Zaltbommel</option>
                                            <option value="Paris">Paris</option>
                                            <option value="San Francisco or San Jose">San Francisco or San Jose</option>
                                            <option value="Studio City, California">Studio City, California</option>
                                            <option value="Veenendaal">Veenendaal</option>
                                            <option value="Oberkochen">Oberkochen</option>
                                            <option value="Hamburg">Hamburg</option>
                                            <option value="Remote">Remote</option>
                                            <option value="New York, NY">New York, NY</option>
                                            <option value="Neckarsulm">Neckarsulm</option>
                                            <option value="Copenhagen">Copenhagen</option>
                                            <option value="Brighton">Brighton</option>
                                            <option value="St.Gallen, Switzerland">St.Gallen, Switzerland</option>
                                            <option value="Fukuoka">Fukuoka</option>
                                            <option value="Chicago">Chicago</option>
                                            <option value="Rotterdam">Rotterdam</option>
                                            <option value="Amsterdam">Amsterdam</option>
                                            <option value="Cupertino, CA">Cupertino, CA</option>
                                        </select>
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

export default JobPositions;