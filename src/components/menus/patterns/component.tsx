import { Menu } from 'antd';
import React, { FC, ReactElement } from 'react';

const { SubMenu } = Menu;

interface PatternMenuProps {
    setterMethod: (a: any) => void;
}


const PatternMenu = (setterMethod: any): ReactElement<any> => {
    const handleMenuClick = ({ key }: { key: string }) => {
        console.log(key);
        setterMethod(key);
    }

    return (
        <Menu selectable onClick={handleMenuClick}>
            <SubMenu key="stillLifes" title="Still lifes">
                <Menu.Item key="Block">Block</Menu.Item>
                <Menu.Item key="Beehive">Beehive</Menu.Item>
                <Menu.Item key="Loaf">Loaf</Menu.Item>
                <Menu.Item key="Boat">Boat</Menu.Item>
                <Menu.Item key="Tub">Tub</Menu.Item>
            </SubMenu>
            <SubMenu key='oscillators' title="Oscillators" disabled>
                <Menu.Item key="o1">5d menu item</Menu.Item>
                <Menu.Item key="o2">6th menu item</Menu.Item>
            </SubMenu>
            <SubMenu key='spaceships' title="Spaceships">
                <Menu.Item key="Glider">Glider</Menu.Item>
                <Menu.Item key="ss2">...</Menu.Item>
            </SubMenu>
        </Menu>
    )
}


export { PatternMenu }