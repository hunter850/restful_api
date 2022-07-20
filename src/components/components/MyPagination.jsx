import { Fragment } from "react";
import { Pagination } from "react-bootstrap";

function MyPagination(props) {
    const { datas, nowPage, clickHandler, prevNextHandler } = props;
    return (
        <Pagination>
            <Pagination.Prev onClick={() => prevNextHandler(-1)} />
            {Array(11)
                .fill(1)
                .map((number, index) =>
                    datas.page + index - 5 >= 1 && datas.page + index - 5 <= datas.totalPages ? (
                        <Fragment key={"pagination" + index}>
                            <Pagination.Item
                                active={+datas.page + index - 5 === +nowPage}
                                onClick={() => clickHandler(datas.page + index - 5)}
                                className="p-0"
                            >
                                {datas.page + index - 5}
                            </Pagination.Item>
                        </Fragment>
                    ) : null
                )}
            <Pagination.Next onClick={() => prevNextHandler(1)} />
        </Pagination>
    );
}

export default MyPagination;
