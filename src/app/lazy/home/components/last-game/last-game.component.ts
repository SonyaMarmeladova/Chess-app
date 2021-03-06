import { Component, OnInit, HostListener } from '@angular/core';
import { calZoom } from '@core/utils/chess.utils';

@Component({
  selector: 'app-last-game',
  templateUrl: './last-game.component.html',
  styleUrls: ['./last-game.component.scss']
})
export class LastGameComponent implements OnInit {

  zoom: number = calZoom(212);

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.zoom = calZoom(212);
  }
}
