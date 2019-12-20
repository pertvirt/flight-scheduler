import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Flight} from '../models/flight';
import {FlightService} from '../services/flight.service';
import {ActivatedRoute} from '@angular/router';
// Lay index hien tai

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {

  flight: Observable<Flight>;
  flight_id: number;
  success = false;
  trip_types = ['One Way', 'Round Trip', 'Multi Destination'];


  constructor(private flightService: FlightService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.flight_id = Number(params.get('id'));
      }
    );
    this.loadFlightData();
  }

  loadFlightData() {
    this.flightService.getFlight(this.flight_id).subscribe(
      data => {
        this.flight = data;
      }
    );
    console.log(this.flight_id);
  }

  updateFlight() {
    this.flightService.updateFlight(this.flight_id, this.flight).subscribe(
      data => {
        this.flight = data as Observable<Flight>;
        this.success = true;
      }, error => console.log('Oops, Cannot Update! ' + error)
    );
  }

  onSubmit() {
    this.updateFlight();
  }

}
