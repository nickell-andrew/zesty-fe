import React from 'react';
import 'antd/dist/antd.css';
import {
  Route,
  Switch,
  BrowserRouter,
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import VisualSearch from './routes/visualSearch'

const {
  Header,
  // Footer,
  Content } = Layout;

const About = () => {
  return <h2>About</h2>;
}

const Users = () => {
  return <h2>Users</h2>;
}


console.log(process.env.REACT_APP_API_KEY)
const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/">Visual Search</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/users">Users</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <VisualSearch />
          </Route>
        </Switch>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
    </BrowserRouter>
  );
}

export default App;
