import { PageHeader, Row, Tag, Typography } from "antd";
import { FC, ReactNode } from "react";
import './styles.css'

const { Paragraph } = Typography;

interface HeaderProps {
    children?: ReactNode;
    running?: boolean;
    iteration?: number;
}

const Header: FC<HeaderProps> = ({ children, running, iteration }) => {

    const content = (
        <>
            <Paragraph>
                The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
            </Paragraph>
            <Paragraph>
                It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </Paragraph>
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
            tags={running ? <><Tag color="blue">Running</Tag><Tag>{iteration}</Tag></> : undefined}
            extra
        >
            <Content>
                {content}
            </Content>
        </PageHeader>
    )
}

export { Header };