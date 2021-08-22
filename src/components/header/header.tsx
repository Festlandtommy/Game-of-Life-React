import { Button, PageHeader, Row, Tag } from "antd";
import { FC, ReactNode } from "react";
import './styles.css'

interface HeaderProps {
    children?: ReactNode;
    running?: boolean;
}

const Header: FC<HeaderProps> = ({ children, running }) => {

    const content = (
        <>
            <div>
                {children}
            </div>
        </>
    );

    interface ContentProps {
        children?: ReactNode,
        extraContent?: ReactNode,
    }

    const Content: FC<ContentProps> = ({ children, extraContent }) => (
        <Row>
            <div style={{ flex: 1 }}>{children}</div>
            <div className="image">{extraContent}</div>
        </Row>
    );

    return (
        <PageHeader
            className="site-page-header"
            title="Conway's Game of Life"
            tags={running ? <Tag color="blue">Running</Tag> : undefined}
            extra
        >
            <Content>
                {content}
            </Content>
        </PageHeader>
    )
}

export { Header };