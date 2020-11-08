// robofriends App.js component using redux

import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import '../containers/App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.reqRobots.robots,
		isPending: state.reqRobots.isPending,
		error: state.reqRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		});
		return isPending ? 
			<h1>Loading...</h1> :
			(
				<div className='tc'>
					<h1 className='f1 f-headline-ns tc db mb3 mb4-ns'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange} />
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots} />
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(App);