import * as TypeMoq from "typemoq"

import { SocketManager } from "../src/data/SocketManager"

import { IGameData } from "../src/games/IGameData"

import { RoomData } from "../src/rooms/RoomData"

export const createSocketManager = () => {
    return new SocketManager()
}

export const createRoomData = (
    args: {
        name?: string,
        players?: string[],
        spectators?: string[],
        gameData?: IGameData
    }
) => {
    return new RoomData(
        args.name ?? "roomName",
        args.players ?? createPlayers(),
        args.spectators ?? createSpectators(),
        args.gameData ?? TypeMoq.Mock.ofType<IGameData>().object,
    )
}

const createPlayers = () => {
    return ["player1"]
}

const createSpectators = () => {
    return ["spectator1"]
}
