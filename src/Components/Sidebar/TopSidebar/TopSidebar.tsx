import React, {SyntheticEvent} from "react";
import style from './TopSidebar.module.css';
import {Button, ButtonToolbar, Icon, Sidebar, Alert} from "rsuite";

type TopSidebarType = {
    markAllAsRead: () => void
    deleteRead: (id: SyntheticEvent<Element, Event>) => void
    deleteAll: () => void
}

export const TopSidebar: React.FC<TopSidebarType> = (props) => {
    const markAllAsReadHandler = () => props.markAllAsRead();
    const deleteReadHandler = (id: SyntheticEvent<Element, Event>) => props.deleteRead(id);
    const deleteOldHandler = () => {Alert.info('You have no old notifications.')};
    const deleteAllHandler = () => props.deleteAll();

    return <>
        <Sidebar classPrefix={style.topSidebar}>
            <ButtonToolbar classPrefix={style.topSidebar_items}>
                <Button color='blue' onClick={markAllAsReadHandler}>
                    <Icon icon={'check'}/> Mark All As Read
                </Button>
                <Button className={style.topSidebar_items_item} color="green" onClick={deleteReadHandler}>
                    <Icon icon={'eye-slash'}/> Delete Read Notifications
                </Button>
                <Button className={style.topSidebar_items_item} color="yellow" onClick={deleteOldHandler}>
                    <Icon icon={'trash'}/> Delete Old Notifications
                </Button>
                <Button className={style.topSidebar_items_item} color="red" onClick={deleteAllHandler}>
                    <Icon icon={'trash2'}/>Delete All Notifications
                </Button>
            </ButtonToolbar>
        </Sidebar>
    </>
}