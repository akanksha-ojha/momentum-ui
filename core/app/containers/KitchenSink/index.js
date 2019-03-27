import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@collab-ui/react';
import Example from '../Example';
import componentsData from '../../../../data/combined.json';

class KitchenSink extends React.Component {
  state = {
    currentComponent: '',
  };

  render() {
    const components = sortBy(
      componentsData.filter(component => {
        for (let section of component.sections) {
          return section.variations && section.variations.core;
        }
      }),
      ['name']
    );

    const createNavLinks = components.map((item, idx) => {
      return (
        <SidebarNavItem
          key={`${item.id}-${idx}`}
          customAnchorNode={
            <NavLink activeClassName="cui-active-nav" to={`/${item.name}`} />
          }
          className="cui-list-item--primary"
          key={`${item.id}-${idx}`}
          keyboardKey={item.name}
          title={item.name}
        />
      );
    });

    const createRoutes = components.map((item, idx) => {
      return (
        <Route
          key={`${item.name}-${idx}`}
          exact
          path={`/${item.name}`}
          render={() => <Example item={item} />}
        />
      );
    });

    return (
      <React.Fragment>
        <div className="docs-container--with-side-nav">
          <Sidebar
            className="docs-container__side-nav"
            expandable={false}
            withIcons={false}
            isPageLevel={true}
          >
            <SidebarBody>
              <SidebarNav>{createNavLinks}</SidebarNav>
            </SidebarBody>
          </Sidebar>
          <div className="docs-container__content">
            <h1>Kitchen Sink</h1>
            <Switch>{createRoutes}</Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default KitchenSink;
