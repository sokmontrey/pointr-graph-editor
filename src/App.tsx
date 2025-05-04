import './App.css';
import MainCanvas from "./components/canvas/MainCanvas.tsx";
import ModeControl from "./components/controls/ModeControl.tsx";
import ImageOverlayControl from "./components/controls/ImageOverlayControl.tsx";
import ImageOverlayCanvas from "./components/canvas/ImageOverlayCanvas.tsx";
import BulletGrid from "./components/canvas/BulletGrid.tsx";
import ModeOverlayCanvas from "./components/canvas/ModeOverlayCanvas.tsx";
import CommandControl from "./components/controls/CommandControl.tsx";
import GraphControl from "./components/controls/GraphControl.tsx";
import WorkspaceControl from "./components/controls/WorkspaceControl.tsx";
import Neo4jControl from "./components/controls/Neo4jControl.tsx";
import ReferenceNodeControl from "./components/controls/ReferenceNodeControl.tsx";
import {useModeStore} from "./stores/main";
import SelectMode from "./domain/modes/SelectMode.ts";
import GridControl from "./components/controls/GridControl.tsx";
import {usePersistenceDebouncingAttachment} from "./hooks/attachments";
import React from "react";
import LeftPopupControl from "./components/common/LeftPopupControl.tsx";

import {GridTableIcon, Image03Icon, NanoTechnologyIcon, StudyDeskIcon} from '@hugeicons/core-free-icons';

export default function App() {
    useModeStore.getState().setMode(new SelectMode());

    usePersistenceDebouncingAttachment(1000);

    return (<>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <GraphControl/>
            <ReferenceNodeControl/>
        </div>

        <div style={leftMiddleStyle}>
            <div className="flex flex-col gap-1 bg-gray-100 rounded-xl p-1 ">
                <LeftPopupControl icon={StudyDeskIcon} title="Workspace">
                    <WorkspaceControl/>
                </LeftPopupControl>
                <LeftPopupControl icon={Image03Icon} title="Image Overlay">
                    <ImageOverlayControl/>
                </LeftPopupControl>
                <LeftPopupControl icon={GridTableIcon} title="Grid">
                    <GridControl/>
                </LeftPopupControl>
                <LeftPopupControl icon={NanoTechnologyIcon} title="Neo4j">
                    <Neo4jControl/>
                </LeftPopupControl>
            </div>
        </div>

        <div style={topCenteredStyle}>
            <CommandControl/>
            <ModeControl/>
        </div>

        <div style={{position: 'relative'}}>
            <ModeOverlayCanvas zIndex={1000}/>
            <MainCanvas zIndex={100}/>
            <BulletGrid zIndex={10}/>
            <ImageOverlayCanvas zIndex={0}/>
        </div>
    </>);
}

const topCenteredStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
};

const leftMiddleStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
};
