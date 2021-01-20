import { IGameData } from "../games/IGameData"

/**
 * Represents data about a room on the server.
 */
export class RoomData<TGameData extends IGameData> {
    /**
     * Constructor.
     */
    constructor(
        public name: string,
        public players: string[],
        public spectators: string[],
        public gameData: TGameData,
    ) { }

    /**
     * Adds the given player to the room.
     */
    addPlayer(player: string) {
        if (!this.playerIsPresent(player)) {
            this.players.push(player)
        }

        return true
    }

    /**
     * Adds the given player to the room as a spectator.
     */
    addSpectator(player: string) {
        if (!this.spectatorIsPresent(player)) {
            this.spectators.push(player)
        }

        return true
    }

    /**
     * Returns whether the given player is in this room.
     */
    playerIsPresent(player: string) {
        return this.players.includes(player)
    }

    /**
     * Returns whether the given player is in this room as a spectator.
     */
    spectatorIsPresent(player: string) {
        return this.spectators.includes(player)
    }

    /**
     * Removes the given player from the room.
     */
    removePlayer(player: string) {
        if (this.playerIsPresent(player)) {
            this.gameData.removePlayer(player)

            let index = this.players.indexOf(player)
            this.players.splice(index, 1)
        }

        return true
    }

    /**
     * Removes the given spectator from the room.
     */
    removeSpectator(player: string) {
        if (this.spectatorIsPresent(player)) {
            let index = this.spectators.indexOf(player)
            this.spectators.splice(index, 1)
        }

        return true
    }

    /**
     * Starts a game in this room with the given rule set.
     */
    startGame() {
        this.gameData.start(this.players)
    }

    /**
     * Returns whether this room's game is in progress.
     */
    isInProgress() {
        return this.gameData.isInProgress()
    }

    /**
     * Clears the game data in this room.
     */
    clear() {
        this.players = []
        this.spectators = []

        return this.gameData.clear()
    }
}
