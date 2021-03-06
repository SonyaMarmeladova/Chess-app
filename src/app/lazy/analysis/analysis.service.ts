import { Injectable } from '@angular/core';
import { Key } from 'chessground/types';

import { TableSelectedCell } from '@shared/components/common-table/common-table.interfaces';
import { MovesTableItem } from '@shared/components/moves-table/moves-table.interfaces';
import { GlobalAnalysisUtils } from '@core/utils/global-analysis-utils.class';
import { ChessTurn } from '@core/enums/chess.enums';
import { Safe } from '@core/decorators/safe.decorator';

@Injectable()
export class AnalysisService extends GlobalAnalysisUtils {

  static createMove(N: number, column: string, value: string): TableSelectedCell {
    return { N, column, value };
  }

  private isFirst(cell: TableSelectedCell, n: number): boolean {
    return cell.N === n && cell.column === ChessTurn.White;
  }

  private isLast(cell: TableSelectedCell, moves: MovesTableItem[]): boolean {
    return cell.N === moves.length && (cell.column === ChessTurn.Black || !moves[moves.length - 1].black);
  }

  private isWhite(cell: TableSelectedCell): boolean {
    return cell.column === ChessTurn.White;
  }

  constructor() {
    super();
  }

  castChessMoves(m: Key[]): MovesTableItem[] {
    const moves: MovesTableItem[] = [];
    for (let i = 0, k = 1; i < m.length; i += 2) {
      moves.push({ N: k++, white: m[i], black: m[i + 1] });
    }

    return moves;
  }

  @Safe({ returnValue: null })
  getPrevMove(currentMove: TableSelectedCell, moves: MovesTableItem[]): TableSelectedCell {
    if (this.isFirst(currentMove, 1)) return this.getFirstMove(moves);

    const index = moves.findIndex(m => m.N === currentMove.N);
    if (index !== -1) {
      const isWhite = this.isWhite(currentMove);
      const move = isWhite ? moves[index - 1] : moves[index];

      return AnalysisService.createMove(
        move.N,
        isWhite ? ChessTurn.Black : ChessTurn.White,
        isWhite ? move.black : move.white
      );
    }

    return currentMove;
  }

  @Safe({ returnValue: null })
  getNextMove(currentMove: TableSelectedCell, moves: MovesTableItem[]): TableSelectedCell {
    if (this.isFirst(currentMove, 0)) return AnalysisService.createMove(moves[0].N, ChessTurn.White, moves[0].white);
    else if (this.isLast(currentMove, moves)) return currentMove;

    const index = moves.findIndex(m => m.N === currentMove.N);
    if (index !== -1) {
      const isWhite = currentMove.column === ChessTurn.White;
      const move = moves[index];

      return AnalysisService.createMove(
        move.N + Number(!isWhite),
        isWhite ? ChessTurn.Black : ChessTurn.White,
        isWhite ? move.black : moves[index + 1].white
      );
    }

    return currentMove;
  }

  @Safe({ returnValue: null })
  getFirstMove(moves: MovesTableItem[]): TableSelectedCell {
    return AnalysisService.createMove(0, ChessTurn.White, moves[0].white);
  }

  @Safe({ returnValue: null })
  getLastMove(moves: MovesTableItem[]): TableSelectedCell {
    const lastMove: MovesTableItem = moves[moves.length - 1];

    return AnalysisService.createMove(
      lastMove.N,
      lastMove.black ? ChessTurn.Black : ChessTurn.White,
      lastMove.black ? lastMove.black : lastMove.white
    );
  }
}
