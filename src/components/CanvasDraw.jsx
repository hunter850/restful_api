import { Fragment, useEffect, useRef, useState } from "react";
import { canvasDatas } from "../datas/canvasDatas";
import styles from "./css/canvasData.module.scss";

function CanvasDraw() {
    const { box, wrap, canvas_bord } = styles;
    const [cart, setCart] = useState([]);
    const [cache, setCache] = useState({});
    const canvasRef = useRef(null);
    const shadowRef = useRef(null);
    const addItem = (id) => {
        const item = canvasDatas.find((data) => data.id === id);
        if (item) {
            const newItem = { ...item, tid: Date.now() };
            setCart([...cart, newItem]);
        }
    };
    const deleteItem = (tid) => {
        const newCart = cart.filter((item) => item.tid !== tid);
        setCart(newCart);
    };
    const getImageFromPath = (path) => {
        return new Promise((resolve, reject) => {
            if (cache[path]) {
                return resolve(cache[path]); // 回傳已存在的資料
            }
            const img = new Image();
            img.onload = () => {
                resolve(img);
                setCache({ ...cache, [path]: img });
            };
            img.src = path;
        });
    };

    const renderCanvas = async () => {
        const ctx = canvasRef.current.getContext("2d");
        const shadowCtx = shadowRef.current.getContext("2d");
        const bg = await getImageFromPath("/dish.jpeg");
        shadowCtx.clearRect(0, 0, shadowRef.current.width, shadowRef.current.height);
        shadowCtx.drawImage(bg, 0, 0);

        const tmpCart = cart.slice(0, 5);
        for (let i = 0; i < tmpCart.length; i++) {
            const img = await getImageFromPath(`/${tmpCart[i].img}`);
            shadowCtx.drawImage(img, i * 100, i * 100);
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(shadowRef.current, 0, 0);
    };
    useEffect(() => {
        renderCanvas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);
    return (
        <Fragment>
            <div className={box}>
                {canvasDatas.map((item) => (
                    <div key={item.id} className={wrap} onClick={() => addItem(item.id)}>
                        <img src={item.img} alt={item.name} />
                    </div>
                ))}
            </div>
            <canvas width="720" height="666" className={canvas_bord} ref={canvasRef} />
            <canvas width="720" height="666" className={canvas_bord} ref={shadowRef} hidden />
            <div className={box}>
                {cart.map((item) => (
                    <div key={item.tid} className={wrap} onClick={() => deleteItem(item.tid)}>
                        <img src={item.img} alt={item.name} />
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

export default CanvasDraw;
