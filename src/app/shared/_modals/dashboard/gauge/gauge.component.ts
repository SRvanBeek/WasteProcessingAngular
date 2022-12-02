import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent {
  _totalWaste: number;
  _wasteForCategory: number;

  @Input()
  set wasteForCategory(wasteAmount: number) {
    this._wasteForCategory = wasteAmount;
  }
  @Input()
  set totalWaste(totalWasteAmount: number) {
    this._totalWaste = totalWasteAmount
  }


  percentageWaste(): number {
    let percentage = (this._wasteForCategory / this._totalWaste) * 100
    return percentage
  }

  gaugeRotation(percentage: number) {
    return (percentage / 100) * 180
  }

}
