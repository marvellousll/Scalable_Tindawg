import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FaGem, FaGithub, FaHeart, FaList, FaRegLaughWink, FaTachometerAlt } from 'react-icons/fa'
import {
  Menu,
  MenuItem, ProSidebar,
  SidebarContent, SidebarFooter, SidebarHeader, SubMenu
} from 'react-pro-sidebar'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
interface ExplorePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPage(props: ExplorePageProps) {
  return (
    <Page>
        <ProSidebar
      breakPoint="md"
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >sidebarTitle</div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">new</span>}
          >
            dashboard
          </MenuItem>
          <MenuItem icon={<FaGem />}>components</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="withSuffix"
            icon={<FaRegLaughWink />}
          >
            <MenuItem>submenu 1</MenuItem>
            <MenuItem>submenu 2</MenuItem>
            <MenuItem>submenu 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title="withPrefix"
            icon={<FaHeart />}
          >
            <MenuItem>submenu 1</MenuItem>
            <MenuItem>submenu 2</MenuItem>
            <MenuItem>submenu 3</MenuItem>
          </SubMenu>
          <SubMenu title="multiLevel" icon={<FaList />}>
            <MenuItem>submenu 1 </MenuItem>
            <MenuItem>submenu 2 </MenuItem>
            <SubMenu title="submenu 3">
              <MenuItem>submenu 3.1 </MenuItem>
              <MenuItem>submenu 3.2 </MenuItem>
              <SubMenu title="submenu 3.3">
                <MenuItem>submenu 3.3.1 </MenuItem>
                <MenuItem>submenu 3.3.2 </MenuItem>
                <MenuItem>submenu 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>viewSource</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
    </Page>
  )
}
