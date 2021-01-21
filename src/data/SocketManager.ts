import { Socket } from "socket.io"

import { PlayerData } from "../players/PlayerData"

/**
 * Represents a map of socket IDs to player names.
 */
type SocketPlayerMap = {
    [socketId: string] : PlayerData
}

/**
 * Class for managing sockets on the server.
 */
export class SocketManager {
    /**
     * Player names indexed by socket ID.
     */
    socketData: SocketPlayerMap = {}

    /**
     * Returns data for all players.
     */
    getAllPlayersData() {
        return Object.keys(this.socketData).map(s => this.getPlayerData(s))
    }

    /**
     * Returns data for the player connected via the socket with the given ID.
     */
    getPlayerData(socketId: string) {
        return this.socketData[socketId]
    }

    /**
     * Sets the player data for the given socket ID.
     */
    setPlayerData(socket: Socket, playerName: string) {
        let playerData = new PlayerData(
            playerName,
            new Date(socket.handshake.time)
        )

        this.socketData[socket.id] = playerData
    }

    /**
     * Removes the socket with the given ID.
     */
    removePlayer(socketId: string) {
        delete this.socketData[socketId]
    }
}
