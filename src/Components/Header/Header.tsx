import React from "react";
import style from './Header.module.css'
import {Header} from 'rsuite';

type HeaderComponentType = {
    SubjectsQuantity: number
}

export const HeaderComponent: React.FC<HeaderComponentType> = (props) => {
    return <>
        <Header classPrefix={style.header}>
            Notifications
            <span>{
                props.SubjectsQuantity > 0
                    ? `1 - ${props.SubjectsQuantity} of ${props.SubjectsQuantity}`
                    : `0 - 0 of 0`
            }
                </span>
        </Header>
    </>
}