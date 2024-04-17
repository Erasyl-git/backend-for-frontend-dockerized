import React from "react";


export default class Table extends React.Component {
    render() {
        return (
            <div className="main-footer">
                <div className="footer">
                    <div className="table-footer">
                        <table>
                            <thead>
                                <tr className="header-table">
                                    <th>О магазине</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="body-taable">
                                    <td>Адреса магазинов</td>
                                </tr>
                                <tr className="body-table">
                                    <td>Акции и скидки</td>
                                </tr>
                                <tr className="body-table">
                                    <td>Юредическим лицам</td>
                                </tr>
                                <tr className="body-table">
                                    <td>Как заказать</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="footer-table">
                                    <td>Обмен и возврат</td>
                                </tr>
                            </tfoot>
                        </table>
                        <table>
                            <thead>
                                <tr className="header-table">
                                    <th>Клиентам</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="body-taable">
                                    <td>Личный кабинет</td>
                                </tr>
                                <tr className="body-table">
                                    <td>Мои заказы</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="body-table">
                                    <td>Вопросы и ответы</td>
                                </tr>
                            </tfoot>
                        </table>
                        <table>
                            <thead>
                                <tr className="header-table">
                                    <th>Информация</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="body-taable">
                                    <td>Политика конфиденциальности и оферта</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="body-table">
                                    <td>Пользовательское соглашение</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )       
    }
}