import React, {ChangeEvent} from "react";
import style from './Content.module.css';
import {Button, Content, Icon, Nav, Popover, Whisper} from "rsuite";
import {SubjectsType} from "../../App";

type ContentPropsType = {
    subjects: Array<SubjectsType>
    markAsRead: (subjectId: number, isRead: boolean) => void
    markAsUnread: (subjectId: number, isRead: boolean) => void
    deletedSubject: (id: number) => void
}

export const MainContent: React.FC<ContentPropsType> = (props) => {
    return <>
        <Content classPrefix={style.content}>
            <Nav className={style.content_header_subject}>SUBJECT</Nav>
            <Nav className={style.content_header_read}><Icon icon={'sequence'}/> READ</Nav>
            <Nav className={style.content_header_receivedAt}><Icon icon={'sequence'}/> RECEIVED AT</Nav>

            <div className={style.content_subjectBody}>
                {
                    props.subjects.map(s => {
                        const speaker = (
                            <Popover title={s.subject}>
                                <p>Notification type: {s.subjectType}</p>
                            </Popover>
                        );
                        return <div key={s.id}
                                    className={!s.isRead ? style.content_subjectBlock : style.content_subjectBlock_readYes}>
                            <Whisper placement="bottomStart" speaker={speaker}>
                                <Button className={!s.isRead ? style.popoverButton : style.popoverButtonYes}>
                                    <span>{s.subject}</span>
                                </Button>
                            </Whisper>
                        </div>
                    })
                }
            </div>
            <div className={style.content_readBody}>
                {
                    props.subjects.map(s => {
                        return <div key={s.id}
                                    className={!s.isRead ? style.content_readBlock : style.content_readBlock_readYes}>
                            <span
                                className={s.isRead ? style.content_readBlock_itemYes : style.content_readBlock_itemNo}>
                                {s.isRead ? 'Yes' : 'No'}
                            </span>
                        </div>
                    })
                }
            </div>
            <div className={style.content_receivedAtBody}>
                {
                    props.subjects.map(s => {
                        const markAsReadHandler = (e: ChangeEvent<HTMLInputElement>) => props.markAsRead(s.id, e.currentTarget.checked)
                        const markAsUnreadHandler = (e: ChangeEvent<HTMLInputElement>) => props.markAsUnread(s.id, e.currentTarget.checked)
                        const deleteSubject = () => props.deletedSubject(s.id)

                        return <div key={s.id}
                                    className={!s.isRead ? style.content_receivedAtBlock : style.content_receivedAtBlock_readYes}>
                            <span>{s.receivedAT}</span>
                            <div className={style.content_receivedAtBlock_iconBar}>
                                <Icon icon={'check2'} size={'lg'}
                                      onClick={markAsReadHandler}
                                      className={s.isRead
                                          ? style.content_receivedAtBlock_iconBar_itemNo
                                          : style.content_receivedAtBlock_iconBar_item
                                      }/>
                                <Icon icon={'eye'} size={'lg'}
                                      onClick={markAsUnreadHandler}
                                      className={s.isRead
                                          ? style.content_receivedAtBlock_iconBar_item
                                          : style.content_receivedAtBlock_iconBar_itemNo
                                      }/>
                                <Icon icon={'trash-o'} size={'lg'}
                                      className={style.content_receivedAtBlock_iconBar_item}
                                      onClick={deleteSubject}/>
                            </div>
                        </div>
                    })
                }
            </div>
        </Content>
    </>
}