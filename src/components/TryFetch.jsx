import { useEffect, useState, Fragment, useCallback, useMemo } from "react";
import { Container, Table } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AB_GET_LIST } from "../config/ajax-path";
import MyPagination from "./components/MyPagination";

function TryFetch() {
    const [datas, setDatas] = useState({});
    const [searchParams] = useSearchParams();
    const nowPage = useMemo(() => {
        return searchParams.get("page") || 1;
    }, [searchParams]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(AB_GET_LIST)
            .then((data) => data.json())
            .then((data) => {
                setDatas(data);
            });
    }, []);
    useEffect(() => {
        if (nowPage < 1) navigate("/?page=1", { replace: false });
        if (nowPage > datas.totalPages) navigate(`/?page=${datas.totalPages}`, { replace: false });
    }, [nowPage, navigate, datas.totalPages]);
    const clickHandler = useCallback(
        (goto) => {
            navigate(`/?page=${goto}`, { replace: false });
            fetch(`${AB_GET_LIST}?page=${goto}`)
                .then((data) => data.json())
                .then((data) => {
                    setDatas(data);
                });
        },
        [navigate]
    );
    const prevNextHandler = useCallback(
        (num) => {
            if (+nowPage + num < 1 || +nowPage + num > datas.totalPages) return;
            clickHandler(+nowPage + num);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [nowPage]
    );
    return (
        <Container>
            <div>
                <MyPagination datas={datas} nowPage={nowPage} clickHandler={clickHandler} prevNextHandler={prevNextHandler} />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>Email</th>
                        <th>手機</th>
                        <th>生日</th>
                        <th>註冊時間</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.rows &&
                        datas.rows.map((data) => (
                            <Fragment key={data.sid}>
                                <tr>
                                    <th>{data.sid}</th>
                                    <th>{data.name}</th>
                                    <th>{data.email}</th>
                                    <th>{data.mobile}</th>
                                    <th>{data.birth}</th>
                                    <th>{data.created_at}</th>
                                </tr>
                            </Fragment>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default TryFetch;
