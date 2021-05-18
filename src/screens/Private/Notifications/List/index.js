import React, {useEffect, useState} from "react";
import {Row, Col} from "antd";
import {Header, Spin} from "shared/components";
import {NAME_SPACES} from "shared/locales/constants";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {Card} from "shared/components";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {messages} from "utils/helpers/message";
import {NotificationQueries} from "shared/graphql/queries";
import {NotificationMutations} from "shared/graphql/mutations";
import {useHistory} from "react-router-dom";

const {NOTIFICATIONS} = NotificationQueries;
const {CREATE_UPDATE_NOTIFICATION} = NotificationMutations;

export default () => {
    const history = useHistory();
    const {t} = useTranslation(NAME_SPACES.NOTIFICATIONS);
    const [notifications, setNotification] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(2000);
    const [total, setTotal] = useState(0);
    const [read, setRead] = useState(false);

    useEffect(() => {
        getNotifications();
    }, []);

    const variables = {skip, take};

    const [getNotifications, {loading}] = useLazyQuery(NOTIFICATIONS, {
        variables,
        onCompleted: (data) => {
            setTotal(data.notifications.count);
            const objects = data.notifications.data.map(notification => {
                let firstPart, middlePart, lastPart;
                if (notification.resource && notification.resource.number) {
                    middlePart = notification.resource.number;
                    [firstPart, lastPart] = notification.body.split(notification.resource.number);
                }
                return {...notification, firstPart, middlePart, lastPart, action: markAsRead}
            });
            setNotification([...notifications, ...objects]);
        },
        onError: (error) => messages({data: error})
    });

    const [updateNotification] = useMutation(CREATE_UPDATE_NOTIFICATION);

    const markAsReadAll = () => {
        const notRead = notifications.filter(notification => !notification.read);
        Promise.all(
            notRead.map(notification => {
                notification.read = true;
                return updateNotification({variables: {data: {id: notification.id, read: notification.read}}})
            })
        ).catch(error => messages({data: error}));
    };

    const markAsRead = (notification) => {
        if (notification.read) return;
        notification.read = true;
        updateNotification({variables: {data: {id: notification.id, read: notification.read}}}).then()
    };

    const goTo = ({resource}) => {
        if (!resource || !resource.id) return;
        history.push('certificates/show/' + resource.id);
    }

    const setBreadcrumbsButtons = [
        {
            title: t("MARK_AS_READ"),
            buttonStyle: "btn--outline",
            disabled: false,
            action: markAsReadAll,
            icon: <span className="icon-Check btn--icon--right" />,
        }
    ];

    const scroll = (event) => {
        // const scrollPosition = event.target.scrollTop + event.target.offsetHeight;
        // const scrollHeight = event.target.scrollHeight;
        // const position = scrollHeight - scrollPosition;
        // const numberObjects = skip + take;
        // if ((position !== 0) || (numberObjects >= total)) return;
        // if (numberObjects >= 7) setModeRead(true);
        // setSkip(skip + take);
    }

    const setBreadcrumbsItem = [{title: t("NOTIFICATIONS"), className: "heading--area--title"}];

    const getTemplateNotification = (notification) => {
        return (
            <div key={'wrapper-' + notification.id}
                 onClick={() => notification.action(notification, notifications)}>
                <Card key={notification.id}
                      cardStyle={"card--details card--details--notifications"
                      + (!notification.read ? " not--read" : "")}>
                    <h2 className="card--details--title">{notification.title}</h2>
                    <p className="card--details--value">
                        {notification.firstPart}
                        <a onClick={() => goTo(notification)}>{notification.middlePart}</a>
                        {notification.lastPart}
                    </p>
                    <div>
                        <small className="card--details--item--key">
                            {moment().format("DD-MM-YYYY hh:mm")}
                        </small>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="wrapper--content">
            <Spin spinning={loading}>
                <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons}/>
                <div className="details--page">
                    <Row justify="center" gutter={[16, 8]}>
                        <Col xs={18} onScroll={scroll}>
                            {[
                                ...notifications.map(notification => !notification.read ? getTemplateNotification(notification) : ''),
                                ...notifications.map(notification => notification.read ? getTemplateNotification(notification) : '')
                            ]}
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    );
};
