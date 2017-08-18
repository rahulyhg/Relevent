import React, {PureComponent, Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Grid, Header, Image, Rail, Segment, Sticky} from 'semantic-ui-react'
import _ from 'lodash'
import EventsItemComponent from './EventsItemComponent'

export default class UsersComponent extends PureComponent {
	static propTypes = {
		users: PropTypes.object.isRequired,
		isUsersLoading: PropTypes.bool.isRequired,
		isUsersLoaded: PropTypes.bool.isRequired,
		usersCount: PropTypes.number.isRequired
	}

	// ShouldComponentUpdate (nextProps) {
	//   const {users} = this.props
	//   const nextUsers = nextProps.users
	//   return !_.isEqual(users, nextUsers)
	// }

	state = {}

	handleContextRef = contextRef => this.setState({ contextRef })

	render () {
		// IsUsersLoading
		const {users, isUsersLoaded, usersCount} = this.props
		const noUsers = isUsersLoaded && usersCount === 0

		const { contextRef } = this.state

		return (
			<Grid centered columns={3}>
				<Grid.Column>
					<div ref={this.handleContextRef}>
						<Segment>
							<Grid stackable>
								<Grid.Column>
									{noUsers
										? 'Hm, it looks like there are no items to show you :('
										: <Card.Group itemsPerRow={1} doubling stackable>
											{_.map(users, (obj, i) => {
												return <EventsItemComponent key={i} {...obj} />
											})}
										</Card.Group>}
								</Grid.Column>
							</Grid>

							<Rail position='left'>
								<Sticky context={contextRef}>
									<Header as='h3'>My events</Header>

								</Sticky>
							</Rail>

							<Rail position='right'>
								<Sticky context={contextRef}>
									<Header as='h3'>Create events</Header>

								</Sticky>
							</Rail>
						</Segment>
					</div>
				</Grid.Column>
			</Grid>
		)
	}
}
