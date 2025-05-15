import { Injectable, signal } from "@angular/core";
import { GameSatus } from "../models/counter.model";

export interface Result {
    id: string;
    outcome: GameSatus;
    startTime: Date;
    completionTime: Date | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class ResultsService {
    gameHistory = signal<Result[]>([]);

    addGame(game: Result) {
        this.gameHistory.update(games => {
            const newGames = [...games];

            newGames.push(game);

            return newGames;
        })
    }

    updateGameStatus(gameToUpdate: Result) {
        this.gameHistory.update((games) => {
            const newGames = [...games].map(game => {
                if (game.id === gameToUpdate.id) {
                    return gameToUpdate;
                }

                return game;
            })

            return newGames;
        })
    }
}