import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Login from '../page/Login';
import List from '../page/List';
import ResultList from '../page/ResultList';
import SaveOut from '../page/SaveOut';
import zhCN from 'antd/lib/locale/zh_CN';
const router = () => {
	return (
		<Router basename="/">
			<ConfigProvider locale={zhCN}>
				<Switch>
					<Route exact={true} path="/" component={Login} />
					<Route exact={true} path="/list" component={List} />
					<Route path="/resultList/" component={ResultList} />
					<Route exact={true} path="/saveOut" component={SaveOut} />
				</Switch>
			</ConfigProvider>
		</Router>
	)
}
export default router()
