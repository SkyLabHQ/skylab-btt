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
import PrivateRoom from "./pages/PrivateRoom";
import PrivatePlayBack from "./pages/PrivatePlayBack";
import PrivateLiveGame from "./pages/PrivateLiveGame";
import Tower from "./pages/Tower";
import SellPaperPage from "./pages/SellPaper";

const AppRoutes = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={<TacToeMode />}></Route>
                <Route path="/home" element={<Activities />} />
                <Route path="/btt/game" element={<TacToe />}></Route>
                <Route path="/btt/history" element={<BttHistory />}></Route>
                <Route path="/btt/playback" element={<BttPlayBack />}></Route>
                <Route path="/btt/live" element={<BttLiveGame />}></Route>
                <Route path="/btt/rules" element={<BttRules />}></Route>
                <Route path="/btt/joinlobby" element={<JoinLobby />}></Route>
                <Route path="/btt/lobby" element={<PrivateLobby />}></Route>
                <Route path="/btt/lobbyRoom" element={<PrivateRoom />} />
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
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
