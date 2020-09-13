import React, {memo} from "react";
import Header from "./header";
import CashInformation from "./cashInformation";
import Divider from "@material-ui/core/Divider";

const Home = memo(() => {
    return (
        <div style={{width: '100%'}}>
            <div style={{marginBottom: 30}}>
                <Header/>
            </div>
            <Divider/>
            <div style={{marginTop: 30}}>
                <CashInformation/>
            </div>
        </div>
    )
});

export default Home;