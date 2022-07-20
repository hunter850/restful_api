import { useEffect } from "react";

function TryFetch() {
    useEffect(() => {
        fetch("http://localhost:3300/address_book/api")
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
            });
    }, []);
    return <div>TryFetch</div>;
}

export default TryFetch;
