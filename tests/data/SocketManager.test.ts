import { Socket } from "socket.io"
import { Handshake } from "socket.io/dist/socket"
import * as TypeMoq from "typemoq"

import { createSocketManager } from "../TestHelpers"

describe("socket manager", () => {
    it("can get player data", () => {
        // arrange
        let socketManager = createSocketManager()

        let handshake = TypeMoq.Mock.ofType<Handshake>()
        handshake.setup(m => m.time).returns(() => "23 September 1979 00:01:54")

        let socket = TypeMoq.Mock.ofType<Socket>()
        socket.setup(m => m.id).returns(() => "aiya")
        socket.setup(m => m.handshake).returns(() => handshake.object)

        socketManager.setPlayerData(socket.object, "napa")

        // act
        let playerData = socketManager.getPlayerData("aiya")

        // assert
        expect(playerData.name).toBe("napa")
        expect(playerData.lastLoginTime).toStrictEqual(new Date(1979, 8, 23, 0, 1, 54))
    })
})
