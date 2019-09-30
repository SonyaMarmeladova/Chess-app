import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ChessMove, CgMove } from '@core/interfaces/chess-move.interfaces';
import { UCI_COMMANDS } from '@core/constants/stockfish-worker.constants';
import { pushMove, appendMove, toFEN } from '@core/utils/chess.utils';
import { ArrowEvents } from '@core/enums/chess-events.enumn';
import { WorkerService } from '../../app-worker.service';
import { AnalysisService } from './analysis.service';
import { Opening } from './analysis.intefaces';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  fenArr: string[] = [];
  currentFEN = '';
  m = '';
  opening = 'Custom Variation';
  score = 0;
  data: ChessMove[] = [{ N: 1 }];

  constructor(private workerService: WorkerService) { }

  private setM() {
    this.workerService.postMessage(UCI_COMMANDS.startPosMove + this.m);
    this.workerService.postMessage(UCI_COMMANDS.goDepth);
  }

  ngOnInit() {
    this.workerService.workerUpdate$.subscribe(line => {
      this.score = Number(this.workerService.engineStatus.score);
    });
  }

  changeFEN($event: Opening) {
    this.data = AnalysisService.castChessMoves($event.m.split(' '));
    this.currentFEN = toFEN($event.m);
    this.opening = $event.n;
    this.m = $event.m;
    this.fenArr = [];
    this.setM();
  }

  onMove($event: CgMove) {
    this.currentFEN = $event.fen;
    this.data = pushMove(this.data, $event);
    this.m = appendMove($event, this.m);
    this.fenArr.push(this.currentFEN);
    console.log(this.fenArr)
    this.setM();
  }

  onArrowChange($event) {
    switch ($event.type) {
      case ArrowEvents.First: {
        console.log('First came');
        break;
      }
      case ArrowEvents.Next: {
        console.log('Next came');
        break;
      }
      case ArrowEvents.Prev: {
        console.log('Prev came');
        break;
      }
      case ArrowEvents.Last: {
        console.log('Last came');
        break;
      }
    }
  }
}
