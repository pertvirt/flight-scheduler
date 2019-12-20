import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FlightService} from '../services/flight.service';
import {Flight} from '../models/flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  public flights: Observable<Flight[]>;
  success = false;

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.loadFlightsData();
  }

  loadFlightsData() {
    this.flights = this.flightService.getAllFlights();
  }

  deleteFlight(id) {
    this.flightService.deleteFlight(id).subscribe(
      data => {
        this.success = true;
        this.loadFlightsData();
      }, error => console.log('Failed: ' + error)
    );
  }

  deleteAllFlights() {
    this.flightService.deleteAllFlights().subscribe(
      data => {
        this.success = true;
        this.loadFlightsData();
      }, error => console.log('Failed: ' + error)
    );
  }

}
