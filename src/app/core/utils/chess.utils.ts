import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as Chess from 'chess.js';
import { Api } from 'chessground/api';
import { Config } from 'chessground/config';
import { Color, Role } from 'chessground/types';

export function defConfig(chess: Chess, orien: Color): Config {
  return {
    orientation: orien,
    highlight: {
      lastMove: true,
      check: true
    },
    animation: {
      enabled: true,
      duration: 200
    },
    movable: {
      color: 'white',
      free: false,
      dests: toDests(chess),
      showDests: true,
    },
    drawable: {
      enabled: true,
      visible: true
    },
    events: {
      change: () => {}
    }
  };
}

export function isPromotion(chess: Chess) {
  const moves = chess.moves({ verbode: true });
  return moves.some(m => m.includes('='));
}

export function toDests(chess: Chess) {
  const dests = {};
  chess.SQUARES.forEach(s => {
    const ms = chess.moves({square: s, verbose: true});
    if (ms.length) {
      dests[s] = ms.map(m => m.to);
    }
  });

  return dests;
}

export function toColor(chess: Chess) {
  return (chess.turn() === 'w')  ? 'white' : 'black';
}

export function playOtherSide(cg: Api, chess: Chess, cgMove = null) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest});
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
    if (cgMove) {
      cgMove.emit({from: orig, to: dest, turn: chess.turn() });
    }
  };
}

export function aiPlay(cg: Api, chess: Chess, delay: number, firstMove: boolean, promotionSubject: Subject<string>) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest});
    if (isPromotion(chess)) {
      promotionSubject.next('message');
      promotionSubject.pipe(take(1)).subscribe((role: Role) => {
        console.log(role);
        cg.newPiece({ role, color: toColor(chess), promoted: true}, 'd5');
      });
    }
    setTimeout(() => {
      const moves = chess.moves({ verbose: true });
      const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];

      chess.move(move.san);
      cg.move(move.from, move.to);
      cg.set({
        turnColor: toColor(chess),
        movable: {
          color: toColor(chess),
          dests: toDests(chess)
        }
      });
      cg.playPremove();
    }, delay);
  };
}

export function opPlay(cg: Api, chess: Chess, cgMove = null) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest});
    if (cgMove) {
      cgMove.emit({from: orig, to: dest, turn: chess.turn() });
    }
  };
}
