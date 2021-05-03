import React, {useState} from "react";
import style from './BottomSidebar.module.css';
import {Button, Icon, Input, InputPicker, Sidebar} from "rsuite";

export type FilterValueType = 'All' | 'Read' | 'Unread';

type BottomSidebarType = {
    changeFilter: (value: FilterValueType) => void
}

export const BottomSidebar: React.FC<BottomSidebarType> = (props) => {
    const [value, setValue] = useState<FilterValueType>('All')
    let searchOptions = [
        {
            "label": "All",
            "value": "All"
        },
        {
            "label": "Read",
            "value": "Read"
        },
        {
            "label": "Unread",
            "value": "Unread"
        }];

    const onChangeHandler = (e: FilterValueType) => {
        setValue(e)
    }
    const filterClick = (value: FilterValueType) => {
        props.changeFilter(value)
    }
    const onClearHandler = () => {
        props.changeFilter('All')
    }
    return <>
        <Sidebar classPrefix={style.bottomSidebar}>
            <div className={style.bottomSidebar_header}>
                Filter Records
                <div><Icon icon={'angle-up'} size={"lg"}/></div>
            </div>
            <div className={style.bottomSidebar_body}>
                Belonging To
                <InputPicker
                    data={[]}
                    placeholder={'admin@mail.com'}
                    className={style.bottomSidebar_belongingTo}/>
                Show Only
                <InputPicker
                    data={searchOptions}
                    placeholder={'All'}
                    onChange={onChangeHandler}
                    className={style.bottomSidebar_showOnly}/>

                <div className={style.bottomSidebar_dateBlock}>
                    <span className={style.bottomSidebar_dateBlock_from}>
                        From
                    </span>
                    <span className={style.bottomSidebar_dateBlock_to}>
                        To
                    </span>
                    <div className={style.bottomSidebar_inputsBlock}>
                        <Input
                            placeholder={'yyyy-mm-dd'}
                            className={style.bottomSidebar_date_from}/>
                        <Input
                            placeholder={'yyyy-mm-dd'}
                            className={style.bottomSidebar_date_to}/>
                    </div>
                </div>
            </div>
            <div className={style.bottomSidebar_bottomLine}/>
            <div className={style.bottomSidebar_buttonsBlock}>
                <span className={style.bottomSidebar_buttonsBlock_clear} onClick={onClearHandler}>Clear</span>
                <Button
                    onClick={() => filterClick(value)}
                    appearance="primary"
                    className={style.bottomSidebar_buttonsBlock_filter}>
                    <Icon icon={'filter'}/> Filter</Button>
            </div>
        </Sidebar>
    </>
}