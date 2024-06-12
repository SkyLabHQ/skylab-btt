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
import JoinLobby from "./pages/JoinLobby";
import PrivateLobby from "./pages/PrivateLobby";
import PvpRoom from "./pages/PvpRoom";
import PrivatePlayBack from "./pages/PrivatePlayBack";
import PrivateLiveGame from "./pages/PrivateLiveGame";
import Tower from "./pages/Tower";
import SellPaperPage from "./pages/SellPaper";
import Match from "./pages/Match";
import Accept from "./pages/Accept";
import PvpHome from "./pages/PvpHome";
import PvpLayout from "./components/PvpLayout";

const AppRoutes = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={<TacToeMode />}></Route>
                <Route path="/home" element={<Activities />} />
                <Route path="/btt/match" element={<Match />}></Route>
                <Route path="/btt/accept" element={<Accept />}></Route>
                <Route path="/btt/game" element={<TacToe />}></Route>
                <Route path="/btt/history" element={<BttHistory />}></Route>
                <Route path="/btt/playback" element={<BttPlayBack />}></Route>
                <Route path="/btt/live" element={<BttLiveGame />}></Route>
                <Route path="/btt/rules" element={<BttRules />}></Route>
                <Route path="/btt/joinlobby" element={<JoinLobby />}></Route>
                <Route path="/btt/lobby" element={<PrivateLobby />}></Route>
                <Route
                    path="/btt/lobbyPlayback"
                    element={<PrivatePlayBack />}
                />
                <Route
                    path="/btt/lobbyLive"
                    element={<PrivateLiveGame />}
                ></Route>
                <Route path="/tower" element={<Tower />}></Route>
                <Route path="/buypaper" element={<SellPaperPage />}></Route>

                <Route path="/pvp" element={<PvpLayout />}>
                    <Route path="/pvp" element={<PvpHome />} />
                    <Route path="/pvp/game" element={<PvpRoom />} />
                    <Route path="/pvp/accept" element={<Accept />}></Route>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
