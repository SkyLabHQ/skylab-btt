import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Activities from "./pages/Activities";
import TacToe from "./pages/TacToe";
import TacToeMode from "./pages/TacToeMode";
import BttHistory from "./pages/BttHistory";
import BttPlayBack from "./pages/BttPlayBack";
import BttLiveGame from "./pages/BttLiveGame";
import BttRules from "./pages/BttRules";
import PvpRoom from "./pages/PvpRoom";
import Tower from "./pages/Tower";
import SellPaperPage from "./pages/SellPaper";
import Match from "./pages/Match";
import Accept from "./pages/Accept";
import PvpHome from "./pages/PvpHome";
import PvpLayout from "./components/PvpLayout";
import PvpMatch from "./pages/PvpMatch";
import StartBot from "./pages/StartBot";

const AppRoutes = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={<TacToeMode />}></Route>
                <Route path="/startBot" element={<StartBot />} />
                <Route path="/home" element={<Activities />} />
                <Route path="/btt/match" element={<Match />}></Route>
                <Route path="/btt/accept" element={<Accept />}></Route>
                <Route path="/btt/game" element={<TacToe />}></Route>
                <Route path="/btt/history" element={<BttHistory />}></Route>
                <Route path="/btt/playback" element={<BttPlayBack />}></Route>
                <Route path="/btt/live" element={<BttLiveGame />}></Route>
                <Route path="/btt/rules" element={<BttRules />}></Route>
                <Route path="/tower" element={<Tower />}></Route>
                <Route path="/buypaper" element={<SellPaperPage />}></Route>
                <Route path="/pvp" element={<PvpLayout />}>
                    <Route path="/pvp/home" element={<PvpHome />} />
                    <Route path="/pvp/match" element={<PvpMatch />} />
                    <Route path="/pvp/game" element={<PvpRoom />} />
                    <Route path="/pvp/accept" element={<Accept />}></Route>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
