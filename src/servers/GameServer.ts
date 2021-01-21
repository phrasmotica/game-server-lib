/**
 * Represents a server with the given settings type.
 */
export abstract class GameServer<TServerSettings> {
    /**
     * Constructor.
     */
    protected constructor(protected serverSettings: TServerSettings) { }

    /**
     * Starts the server.
     */
    abstract start(): void
}
