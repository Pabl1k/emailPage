import React, {useState} from 'react';
import style from './App.module.css';
import {HeaderComponent} from "./Components/Header/Header";
import {TopSidebar} from "./Components/Sidebar/TopSidebar/TopSidebar";
import {BottomSidebar, FilterValueType} from "./Components/Sidebar/BottomSidebar/BottomSidebar";
import {MainContent} from "./Components/Content/Content";
import 'rsuite/dist/styles/rsuite-default.css';
import {Container, Row} from 'rsuite';

export type SubjectsType = {
    id: number
    subject: string
    isRead: boolean
    receivedAT: string
    subjectType: string
}

export const App = () => {
    const [subjects, setSubjects] = useState<Array<SubjectsType>>([
        {id: 0, subject: 'You have a new message', isRead: false, receivedAT: '2020-05-20 00:00:00', subjectType: 'Success'},
        {id: 1, subject: 'Your details have been updated', isRead: false, receivedAT: '2020-05-20 00:00:00', subjectType: 'Danger'},
        {id: 2, subject: 'You got rated', isRead: false, receivedAT: '2020-05-20 00:00:00', subjectType: 'Warning'},
        {id: 3, subject: "You've been reported", isRead: false, receivedAT: '2020-05-20 00:00:00', subjectType: 'Info'},
        {id: 4, subject: 'You have a new message', isRead: true, receivedAT: '2020-05-20 00:00:00', subjectType: 'Muted'},
        {id: 5, subject: 'Your details have been updated', isRead: true, receivedAT: '2020-05-20 00:00:00', subjectType: 'Success'},
        {id: 6, subject: 'You got rated', isRead: true, receivedAT: '2020-05-20 00:00:00', subjectType: 'Danger'},
        {id: 7, subject: "You've been reported", isRead: true, receivedAT: '2020-05-20 00:00:00', subjectType: 'Warning'}
    ]);
    const [filter, setFilter] = useState<FilterValueType>('All');

    //topSidebar
    function markAllAsRead() {
        let markAll = subjects.filter(s => s.isRead = true)
        setSubjects([...markAll])
    }

    function deleteReadNotifications() {
        let readSubject = subjects.filter(s => {
            if (!s.isRead) {
                return true
            }
        })
        setSubjects([...readSubject])
    }

    function deleteAllNotifications() {
        setSubjects([])
    }

    //receivedAtIcons
    function markAsRead(subjectId: number, isRead: boolean) {
        let subject = subjects.find(s => s.id === subjectId)
        if (subject) {
            subject.isRead = !isRead
        }
        setSubjects([...subjects])
    }

    function markAsUnread(subjectId: number, isRead: boolean) {
        let subject = subjects.find(s => s.id === subjectId)
        if (subject) {
            subject.isRead = isRead
        }
        setSubjects([...subjects])
    }

    function deletedSubject(id: number) {
        let subjectsAfterDelete = subjects.filter(s => s.id !== id)
        setSubjects(subjectsAfterDelete)
    }

    //filter
    let subjectsForContent = subjects;

    if (filter === 'Unread') {
        subjectsForContent = subjects.filter(sub => !sub.isRead)
    }
    if (filter === 'Read') {
        subjectsForContent = subjects.filter(sub => sub.isRead)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return <div className={style.wrapper}>
        <HeaderComponent SubjectsQuantity={subjects.length}/>
        <Container>
            <Row classPrefix={style.sidebarBlock}>
                <TopSidebar
                    markAllAsRead={markAllAsRead}
                    deleteRead={deleteReadNotifications}
                    deleteAll={deleteAllNotifications}/>
                <BottomSidebar changeFilter={changeFilter}/>
            </Row>
            <MainContent
                subjects={subjectsForContent}
                markAsRead={markAsRead}
                markAsUnread={markAsUnread}
                deletedSubject={deletedSubject}/>
        </Container>
    </div>
}