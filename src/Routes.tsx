import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import TacToe from "./pages/TacToe";
import TacToeMode from "./pages/TacToeMode";
import BttHistory from "./pages/BttHistory";
import BttPlayBack from "./pages/BttPlayBack";
import BttLiveGame from "./pages/BttLiveGame";
import PvpRoom from "./pages/PvpRoom";
import Match from "./pages/Match";
import Accept from "./pages/Accept";
import PvpHome from "./pages/PvpHome";
import FreeLayout from "./components/FreeLayout";
import PvpMatch from "./pages/PvpMatch";
import StartBot from "./pages/StartBot";
import BotGame from "./pages/BotGame";
import PlaneMarketLayout from "./components/Plane/Layout";
import Market from "./components/Plane/Market";
import My from "./components/Plane/My";
import Point from "./pages/Point";
import PvpLayout from "./components/PvpLayout";

const AppRoutes = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={<TacToeMode />}></Route>
                <Route path="/point" element={<Point />}></Route>
                <Route path="/btt/match" element={<Match />}></Route>
                <Route path="/btt/accept" element={<Accept />}></Route>
                <Route path="/btt/game" element={<TacToe />}></Route>
                <Route path="/btt/history" element={<BttHistory />}></Route>
                <Route path="/btt/playback" element={<BttPlayBack />}></Route>
                <Route path="/btt/live" element={<BttLiveGame />}></Route>
                <Route path="/free" element={<FreeLayout />}>
                    <Route path="/free/pvp" element={<PvpLayout />}>
                        <Route path="/free/pvp/home" element={<PvpHome />} />
                        <Route path="/free/pvp/match" element={<PvpMatch />} />
                        <Route path="/free/pvp/game" element={<PvpRoom />} />
                        <Route
                            path="/free/pvp/accept"
                            element={<Accept />}
                        ></Route>
                    </Route>

                    <Route path="/free/botHome" element={<StartBot />} />
                    <Route path="/free/botGame" element={<BotGame />} />
                </Route>
                <Route path="/plane" element={<PlaneMarketLayout />}>
                    <Route path="/plane/market" element={<Market />}></Route>
                    <Route path="/plane/my" element={<My />}></Route>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
