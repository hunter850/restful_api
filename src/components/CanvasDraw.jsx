import { Fragment } from "react";
import { canvasDatas } from "../datas/canvasDatas";
import styles from "./css/canvasData.module.scss";

function CanvasDraw() {
    const { box, wrap, canvas_bord } = styles;
    return (
        <Fragment>
            <div className={box}>
                {canvasDatas.map((item) => (
                    <div key={item.id} className={wrap}>
                        <img src={item.img} alt={item.name} />
                    </div>
                ))}
            </div>
            <canvas width="720" height="666" className={canvas_bord} />
        </Fragment>
    );
}

export default CanvasDraw;
