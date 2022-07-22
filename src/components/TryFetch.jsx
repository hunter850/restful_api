import { useEffect, useState, Fragment, useCallback, useMemo } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { AB_GET_LIST_AUTH } from "../config/ajax-path";
import MyPagination from "./components/MyPagination";
import axios from "axios";

function TryFetch() {
    const [datas, setDatas] = useState({});
    const [searchParams] = useSearchParams();
    const { authorized, token } = useAuth();
    const nowPage = useMemo(() => {
        return searchParams.get("page") || 1;
    }, [searchParams]);
    const navigate = useNavigate();
    useEffect(() => {
        // fetch(AB_GET_LIST_AUTH, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((data) => data.json())
        //     .then((data) => {
        //         setDatas(data);
        //     });
        (async () => {
            const response = await axios.get(AB_GET_LIST_AUTH, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDatas(response.data);
        })();
    }, [token]);
    useEffect(() => {
        if (nowPage < 1) navigate("/list?page=1", { replace: false });
        if (nowPage > datas.totalPages) navigate(`/?page=${datas.totalPages}`, { replace: false });
    }, [nowPage, navigate, datas.totalPages]);
    const clickHandler = useCallback(
        (goto) => {
            navigate(`/list?page=${goto}`, { replace: false });
            // fetch(`${AB_GET_LIST_AUTH}?page=${goto}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // })
            //     .then((data) => data.json())
            //     .then((data) => {
            //         setDatas(data);
            //     });
            // (async () => {
            //     // 兩種寫法都可以
            //     // const response = await axios.get(`${AB_GET_LIST_AUTH}?page=${goto}`, { headers: { Authorization: `Bearer ${token}` } });
            //     const response = await axios.get(AB_GET_LIST_AUTH, {
            //         params: { page: goto },
            //         headers: { Authorization: `Bearer ${token}` },
            //     });
            //     setDatas(response.data);
            // })();
            axios
                .get(AB_GET_LIST_AUTH, {
                    params: { page: goto },
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => console.log(response.data));
        },
        [navigate, token]
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
        <>
            {authorized ? (
                <Container className="mt-5">
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
                                            <th>{data.birthday}</th>
                                            <th>{data.created_at}</th>
                                        </tr>
                                    </Fragment>
                                ))}
                        </tbody>
                    </Table>
                </Container>
            ) : (
                <Alert variant="danger">請先登入</Alert>
            )}
        </>
    );
}

export default TryFetch;
