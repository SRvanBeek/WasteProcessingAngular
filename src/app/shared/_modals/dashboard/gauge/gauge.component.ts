import {Component, Input} from '@angular/core';

/**
 * @author Stijn van Beek
 */

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

  /**
   * calculates the percentage of the waste of a selected category compared to the total waste.
   */
  percentageWaste(): number {
    let percentage = (this._wasteForCategory / this._totalWaste) * 100
    return percentage
  }

  /**
   * returns the amount of degrees the gauge needs to rotate with a given percentage.
   * @param percentage the percentage that the gauge needs to rotate.
   */
  gaugeRotation(percentage: number) {
    return (percentage / 100) * 180
  }

}
