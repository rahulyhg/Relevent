import {Route} from 'react-router-dom'
import {Users, Dashboard, Login, Register, Events} from 'containers'
import RouteAuth from 'components/addons/RouteAuth'
import {createBrowserHistory, createMemoryHistory} from 'history'

export const history = getHistory()

const loadLazyComponent = url => {
	return async cb => {
		// NOTE: there isn't any duplication here
		// Read Webpack docs about code-splitting for more info.
		if (process.env.BROWSER) {
			const loadComponent = await import(/* webpackMode: "lazy-once", webpackChunkName: "lazy-containers" */ `containers/${url}/index.jsx`)
			return loadComponent
		}
		const loadComponent = await import(/* webpackMode: "eager", webpackChunkName: "lazy-containers" */ `containers/${url}/index.jsx`)
		return loadComponent
	}
}

export const routes = [
	{
		path: '/',
		exact: true,
		icon: 'newspaper',
		name: 'Dashboard',
		sidebarVisible: true,
		tag: RouteAuth,
		component: Dashboard
	},
	{
		path: '/alerts',
		name: 'Notifications',
		exact: true,
		icon: 'bell',
		sidebarVisible: true,
		tag: RouteAuth,
		component: ''
	},
	{
		path: '/events',
		name: 'Events',
		exact: true,
		icon: 'calendar',
		sidebarVisible: true,
		tag: RouteAuth,
		component: Events
	},
	{
		path: '/search',
		name: 'Search',
		exact: true,
		icon: 'marker',
		sidebarVisible: true,
		tag: RouteAuth,
		component: ''
	},
	{
		path: '/users',
		name: 'Users',
		exact: true,
		icon: 'comments',
		sidebarVisible: true,
		tag: RouteAuth,
		component: Users
	},
	{
		path: '/user',
		name: 'Profile',
		exact: true,
		icon: 'user',
		sidebarVisible: true,
		tag: RouteAuth,
		component: ''
	},
	{
		path: '/settings',
		name: 'Settings',
		exact: true,
		icon: 'settings',
		sidebarVisible: true,
		tag: RouteAuth,
		component: ''
	},
	{
		path: '/auth',
		name: 'Auth',
		tag: Route,
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		tag: Route,
		component: Register
	},
	{
		path: '/user/:id',
		name: 'User',
		lazy: true,
		exact: true,
		tag: RouteAuth,
		component: loadLazyComponent('UserItem')
	}
]

function getHistory () {
	const basename = ''
	if (process.env.BROWSER !== true) {
		return createMemoryHistory()
	}
	return createBrowserHistory({basename})
}
